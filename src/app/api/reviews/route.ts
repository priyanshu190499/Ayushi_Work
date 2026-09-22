import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { z } from "zod";

const reviewSchema = z.object({
  salonId: z.string(),
  bookingId: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  photos: z.array(z.string().max(1_500_000)).max(3).optional(),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        photos: JSON.stringify(data.photos || []),
        customerId: session.user.id,
        salonId: data.salonId,
        bookingId: data.bookingId,
      },
    });

    const stats = await prisma.review.aggregate({
      where: { salonId: data.salonId },
      _avg: { rating: true },
      _count: true,
    });

    await prisma.salon.update({
      where: { id: data.salonId },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Review failed" }, { status: 500 });
  }
}
