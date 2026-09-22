import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { passwordSchema } from "@/lib/password";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: passwordSchema,
  phone: z.string().min(10, "Phone number is required"),
  role: z.enum(["CUSTOMER", "SALON_OWNER"]),
  salonName: z.string().optional(),
  salonAddress: z.string().optional(),
  salonCity: z.string().optional(),
  salonPhone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(data.password, 12);

    if (data.role === "SALON_OWNER") {
      if (!data.salonName || !data.salonAddress || !data.salonCity) {
        return NextResponse.json(
          { error: "Salon details are required for salon registration" },
          { status: 400 }
        );
      }

      const baseSlug = slugify(data.salonName);
      let slug = baseSlug;
      let counter = 1;
      while (await prisma.salon.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter++}`;
      }

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: hashed,
          role: "SALON_OWNER",
          salon: {
            create: {
              name: data.salonName,
              slug,
              address: data.salonAddress,
              city: data.salonCity,
              phone: data.salonPhone || data.phone || "",
              description: `Welcome to ${data.salonName}`,
              coverImage:
                "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
              images: JSON.stringify([
                "https://images.unsplash.com/photo-1521590832787-7532a2715eac?w=600",
                "https://images.unsplash.com/photo-1633681926022-84c23e8cb124?w=600",
              ]),
            },
          },
        },
      });

      return NextResponse.json({ success: true, userId: user.id });
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashed,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
