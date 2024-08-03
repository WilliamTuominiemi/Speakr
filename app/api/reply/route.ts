import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const data = await req.json();

    const newReply = await prisma.reply.create({
      data: {
        base64: data.audio,
        userId: data.userId,
        audioId: data.audioId,
      },
    });

    return new NextResponse(JSON.stringify(newReply), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to create reply', { status: 500 });
  }
};
