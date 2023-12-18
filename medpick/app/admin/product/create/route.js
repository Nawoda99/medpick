import prisma from "../../../libs/Prisma";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();  
        const product = await prisma.products.create({
            data: { 
                title: body.title,
                description: body.description,
                url: body.url,
                price: body.price,
                
                }
        })
        await prisma.$disconnect();
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}