import { connectToDatabase } from "@/library/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse, props: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await props.params;
        await connectToDatabase();
        const product = await Product.findById(id).lean();

        if (!product) {
            return NextResponse.json(
                { error: "Product not found." },
                { status: 404 }
            )
        }

        return NextResponse.json({ product }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "An error occurred while fetching the product." },
            { status: 500 }

        )
    }

}