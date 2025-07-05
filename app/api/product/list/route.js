import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import authSeller from '@/lib/authSeller'
import Product from '@/models/Product'
import connectDB from '@/config/db'

export async function GET(request) {
    try {
        

        // Establish database connection
        await connectDB()

        // Fetch products with timeout and projection
        const products = await Product.find({})
            .maxTimeMS(30000) // 30 second timeout
            .lean()

        return NextResponse.json({ 
            success: true, 
            products 
        })

    } catch (error) {
        console.error('Error in /api/product/seller-list:', error)
        return NextResponse.json(
            { 
                success: false, 
                message: error.message.includes('timed out') 
                    ? 'Database operation timed out' 
                    : 'Internal server error' 
            },
            { status: 500 }
        )
    }
}
