import connectToDB from "@/app/database";
import Item from "@/app/models/Item";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const items = await Item.find();
    return items && NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.log("Error loading items: ", error);
    return NextResponse.json(
      { message: "Error loading items", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();

    console.log("formdata ITEM is passing", body.formData);
    const itemData = body.formData;
    await Item.create(itemData);

    return NextResponse.json({ message: "Item Created" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
