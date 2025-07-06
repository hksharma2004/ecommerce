import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Address from "@/models/Address"; // <-- Import your Address model

export async function GET(request) {
    try {
        await connectDB();

        const { userId } = getAuth(request); // <-- Call getAuth with request

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const addresses = await Address.find({ userId });

        return NextResponse.json({ success: true, addresses });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}