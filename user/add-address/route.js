import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db"; // adjust path as needed
import User from "@/models/User"; // adjust path as needed

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, address } = body;

    if (!userId || !address) {
      return NextResponse.json({ error: "Missing userId or address" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.addresses = user.addresses || [];
    user.addresses.push(address);
    await user.save();

    return NextResponse.json({ message: "Address added successfully", addresses: user.addresses });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
