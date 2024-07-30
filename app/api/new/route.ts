import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const data = await req.json();

    const post = await prisma.audio.create({
      data: {
        base64: data.audio,
        userId: data.userId,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to create', { status: 500 });
  }
};
