import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const audios = await prisma.audio.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new NextResponse(JSON.stringify(audios), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to load', { status: 500 });
  }
};
