import { connectDB } from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from '@/models/User';
import { inngest } from "@/config/inngest";
import { z } from 'zod';
import mongoose from 'mongoose';
import { Resend } from 'resend';

// Input validation schema
const orderSchema = z.object({
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1)
  }),
  items: z.array(
    z.object({
      product: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid product ID format"
      }),
      quantity: z.number().min(1).max(100)
    })
  ).min(1).max(20)
});

export async function POST(request) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    await connectDB();
    const { userId } = getAuth(request);
    
    if (!userId) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: 'Unauthorized: Please login to place an order' }, 
        { status: 401 }
      );
    }

    // Validate input
    let input;
    try {
      input = await request.json();
    } catch (parseError) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const validation = orderSchema.safeParse(input);
    if (!validation.success) {
      await session.abortTransaction();
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.error.format(),
          message: 'Please check your order details'
        },
        { status: 422 }
      );
    }

    const { address, items } = validation.data;

    // Get products with inventory check
    const products = await Promise.all(
      items.map(async item => {
        const product = await Product.findById(item.product).session(session);
        if (!product) {
          throw {
            message: `Product ${item.product} not found`,
            statusCode: 404,
            code: 'PRODUCT_NOT_FOUND'
          };
        }
        if (product.stock < item.quantity) {
          throw {
            message: `Only ${product.stock} items available for ${product.name}`,
            statusCode: 400,
            code: 'INSUFFICIENT_STOCK'
          };
        }
        return product;
      })
    );

    // Calculate total amount
    const subtotal = products.reduce((acc, product, idx) => {
      return acc + (product.offerPrice * items[idx].quantity);
    }, 0);
    const tax = Math.floor(subtotal * 0.02);
    const total = subtotal + tax;

    // Create order event
    const orderEvent = {
      name: 'order/created',
      data: {
        userId,
        address,
        items: items.map((item, idx) => ({
          product: products[idx]._id,
          name: products[idx].name,
          price: products[idx].offerPrice,
          quantity: item.quantity,
          image: products[idx].image
        })),
        subtotal,
        tax,
        total,
        date: new Date().toISOString()
      }
    };

    // Update product stocks
    await Promise.all(
      products.map((product, idx) => {
        product.stock -= items[idx].quantity;
        return product.save({ session });
      })
    );

    // Clear user cart
    await User.findByIdAndUpdate(
      userId, 
      { cartItems: {} },
      { session }
    );

    // Commit transaction
    await session.commitTransaction();

    // Send event after successful DB operations
    await inngest.send(orderEvent);

    // Send confirmation email
    try {
      if (!process.env.RESEND_API_KEY) {
        console.error('Resend API key missing');
        throw new Error('Email service configuration error');
      }

      const resend = new Resend(process.env.RESEND_API_KEY);
      const customer = await User.findById(userId);
      
      if (!customer?.email) {
        console.error('No customer email found for user:', userId);
        throw new Error('Customer email not found');
      }

      const emailContent = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p>Order ID: ${orderEvent.data.date}</p>
        <p>Total Amount: $${(total/100).toFixed(2)}</p>
      `;

      const emailResponse = await resend.emails.send({
        from: 'QuickCart <onboarding@resend.dev>',
        to: [customer.email],
        subject: 'Order Confirmation',
        html: emailContent
      });

      console.log('Email sent successfully:', emailResponse);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', {
        error: emailError.message,
        stack: emailError.stack,
        userId
      });
      // Continue with order processing even if email fails
    }

    return NextResponse.json(
      { 
        success: true,
        orderId: orderEvent.data.date,
        amount: total,
        message: 'Order placed successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    await session.abortTransaction();
    console.error('Order processing error:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
      userId: userId || 'unknown'
    });

    return NextResponse.json(
      { 
        error: error.message || 'Failed to process order',
        code: error.code || 'ORDER_PROCESSING_ERROR',
        details: error.details || null
      },
      { status: error.statusCode || 500 }
    );
  } finally {
    session.endSession();
  }
}
