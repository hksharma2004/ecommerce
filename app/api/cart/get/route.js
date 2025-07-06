import { NextResponse } from 'next/server'
import connectDB  from '@/config/db'
import Product from '@/models/Product'

export const GET = async (request) => {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const cartItems = JSON.parse(searchParams.get('items') || '[]')

    if (!cartItems.length) {
      return NextResponse.json(
        { items: [], total: 0 },
        { status: 200 }
      )
    }

    const productIds = cartItems.map(item => item.productId)
    const products = await Product.find({ _id: { $in: productIds } })

    const itemsWithDetails = cartItems.map(item => {
      const product = products.find(p => p._id.toString() === item.productId)
      return {
        productId: item.productId,
        quantity: item.quantity,
        productDetails: product || null
      }
    })

    const total = itemsWithDetails.reduce((sum, item) => {
      return sum + (item.quantity * (item.productDetails?.price || 0))
    }, 0)

    return NextResponse.json({
      success: true,
      message: 'Cart items retrieved successfully',
      data: {
        items: itemsWithDetails,
        total
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}
