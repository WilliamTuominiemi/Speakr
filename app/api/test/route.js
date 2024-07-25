const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const POST = async (req, res) => {
  try {
    const { audio } = await req.json();

    const testData = await prisma.post.create({
      data: {
        msg: audio,
      },
    });

    return new Response(JSON.stringify(testData), { status: 201 });
  } catch (error) {
    return new Response('Failed to create', { status: 500 });
  }
};
