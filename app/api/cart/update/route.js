import { NextResponse } from 'next/server'
import connectDB from '@/config/db'
import Product from '@/models/Product'

export const POST = async (request) => {
  try {
    const { items, cartData } = await request.json()
    let processedItems = []

    if (Array.isArray(items)) {
      processedItems = items
    } else if (cartData && typeof cartData === 'object') {
      processedItems = Object.entries(cartData).map(([productId, quantity]) => ({
        productId,
        quantity
      }))
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid cart data format' },
        { status: 400 }
      )
    }

    await connectDB()
    const productIds = processedItems.map(item => item.productId)
    const products = await Product.find({ _id: { $in: productIds } })

    // Validate all products exist
    if (products.length !== processedItems.length) {
      const missingProducts = items.filter(
        item => !products.some(p => p._id.toString() === item.productId)
      )
      return NextResponse.json(
        { error: 'Some products not found', missingProducts },
        { status: 404 }
      )
    }

    // Calculate total
    const total = processedItems.reduce((sum, item) => {
      const product = products.find(p => p._id.toString() === item.productId)
      return sum + (item.quantity * product.price)
    }, 0)

    return NextResponse.json({
      success: true,
      message: processedItems.length > 1 ? 'Cart updated successfully' : 'Item added to cart',
      data: {
        items: processedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          productDetails: products.find(p => p._id.toString() === item.productId)
        })),
        total
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}
