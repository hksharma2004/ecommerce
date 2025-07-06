import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from '@/models/User'


export async function POST(request) {
    try {
        const { userId } = getAuth(request); // Pass request to getAuth
        const { address, items } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        // Calculate amount using items
        const products = await Promise.all(
            items.map(item => Product.findById(item.product))
        );
        const amount = products.reduce((acc, product, idx) => {
            return acc + product.offerPrice * items[idx].quantity;
        }, 0);

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
        console.log(error);
        return NextResponse.json({ success: false, message: error.message });
    }
}