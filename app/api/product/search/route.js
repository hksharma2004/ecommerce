import { NextResponse } from 'next/server'
import Product from '@/models/Product'
import connectDB from '@/config/db'

export const GET = async (request) => {
  try {
    await connectDB
    
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).limit(20)

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
