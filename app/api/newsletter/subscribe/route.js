import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email } = await request.json()
    console.log('Received subscription request for email:', email)
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // For development, use test domains for both sender and recipient
    const toEmail = process.env.NODE_ENV === 'development' 
      ? 'test@resend.dev' 
      : email
    const fromEmail = process.env.NODE_ENV === 'development'
      ? 'QuickCart <onboarding@resend.dev>'
      : 'QuickCart <newsletter@quickcart.example.com>'

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'Welcome to QuickCart Newsletter!',
      html: `<strong>Thanks for subscribing!</strong><p>You'll now receive 20% off your first purchase and exclusive deals.</p>`
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { 
          message: 'Failed to send confirmation email',
          error: error.message 
        },
        { status: 500 }
      )
    }

    // Here you would typically also save to your database
    // await saveToDatabase(email)

    return NextResponse.json(
      { message: 'Subscription successful! Check your email for confirmation.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error.message 
      },
      { status: 500 }
    )
  }
}
