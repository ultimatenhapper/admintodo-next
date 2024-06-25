import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take))
    return NextResponse.json(
      { message: "Take tiene que ser un número" },
      { status: 400 }
    );

  if (isNaN(skip))
    return NextResponse.json(
      { message: "Skip tiene que ser un número" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({ data: body });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });

    return NextResponse.json({ message: "Todos borrados" });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
