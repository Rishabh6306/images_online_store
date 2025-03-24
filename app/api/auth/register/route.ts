import { connectToDatabase } from "@/library/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            )
        }

        await connectToDatabase();
        const exitstingUser = await User.findOne({ email });

        if (exitstingUser) {
            return NextResponse.json(
                { error: "User already exists." },
                { status: 400 }
            )
        }

        await User.create({ email, password, role: "User" });

        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.log("Register failed", error);

        return NextResponse.json(
            { error: "An error occurred while creatng a user." },
            { status: 501 }
        )
    }
}