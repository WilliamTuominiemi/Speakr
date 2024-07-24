const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const POST = async (req, res) => {
  try {
    const testData = await prisma.post.create({
      data: {
        msg: 'msg',
      },
    });

    return new Response(JSON.stringify(testData), { status: 201 });
  } catch (error) {
    return new Response('Failed to create', { status: 500 });
  }
};
