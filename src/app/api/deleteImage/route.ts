import { NextResponse } from "next/server";
import { deleteImage } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {

  const imageId = await req.json() as number;

  await deleteImage(imageId);
  return NextResponse.json({ data: "Success" });
}
