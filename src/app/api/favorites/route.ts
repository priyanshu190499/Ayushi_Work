import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { salonId } = await request.json();

  const existing = await prisma.favorite.findUnique({
    where: {
      customerId_salonId: {
        customerId: session.user.id,
        salonId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  }

  await prisma.favorite.create({
    data: { customerId: session.user.id, salonId },
  });

  return NextResponse.json({ favorited: true });
}

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { customerId: session.user.id },
    include: {
      salon: {
        include: { services: { select: { price: true } } },
      },
    },
  });

  return NextResponse.json(favorites);
}
