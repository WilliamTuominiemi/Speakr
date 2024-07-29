import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, audio } = (await req.json()) as { userId: string; audio: string };

    const testData = await prisma.audio.create({
      data: {
        userId,
        base64: audio,
      },
    });

    return new NextResponse(JSON.stringify(testData), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to create', { status: 500 });
  }
};
