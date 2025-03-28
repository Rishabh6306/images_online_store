import { authOptions } from "@/library/auth";
import { connectToDatabase } from "@/library/db";
import Product, { IProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();

        const products = await Product.find({}).lean();

        if (!products || products.length === 0) {
            return NextResponse.json(
                { error: "No Products Found." },
                { status: 404 }
            )
        }

        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized." },
                { status: 401 }
            )
        }

        await connectToDatabase();

        const body: IProduct = await request.json();

        if (!body.name || !body.description || !body.imageUrl || body.variants.length === 0) {
            return NextResponse.json(
                { error: "Title, description, and price are required." },
                { status: 400 }
            )
        }

        const newProducts = await Product.create(body);
        return Response.json({ newProducts }, { status: 200 });
    } catch (error) {
        console.log(error);
        Response.json(
            { error: "Something went wrong." },
            { status: 500 }
        )
    }
}