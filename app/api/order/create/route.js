import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from '@/models/User';
import { inngest } from "@/config/inngest"; // Add this import

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const { address, items } = await request.json();

        // Validate input
        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        if (!address || !items || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        // Calculate amount using items
        const products = await Promise.all(
            items.map(item => Product.findById(item.product))
        );

        // Check if all products were found
        if (products.some(product => !product)) {
            return NextResponse.json({ success: false, message: 'Some products not found' }, { status: 404 });
        }

        const amount = products.reduce((acc, product, idx) => {
            return acc + product.offerPrice * items[idx].quantity;
        }, 0);

        // Send order creation event to Inngest
        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        });

        // Clear user cart
        const user = await User.findById(userId);
        if (user) {
            user.cartItems = {};
            await user.save();
        }

        return NextResponse.json({ success: true, message: 'Order Placed' });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || 'Internal server error' 
        }, { status: 500 });
    }
}