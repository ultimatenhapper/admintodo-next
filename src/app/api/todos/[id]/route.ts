import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Segments) {
  const todo = await prisma.todo.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!todo)
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: NextRequest, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!todo)
    return NextResponse.json(
      { message: `Todo con ${id} no existe` },
      { status: 404 }
    );

  const { complete, description } = await putSchema.validate(
    await request.json()
  );
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
