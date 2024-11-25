import connectToDB from "@/config/db";
import productModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const count = formData.get("count");
    const color = formData.get("color");
    const weight = formData.get("weight");
    const ayaar = formData.get("ayaar");
    const type = formData.get("type");
    const img = formData.get("img");

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    await writeFile(
      path.join(process.cwd(), "public/uploades/" + filename),
      buffer
    );

    const product = await productModel.create({
      name,
      price,
      count,
      color,
      weight,
      ayaar,
      type,
      img: `http://localhost:3000/uploades/${filename}`,
    });

    return Response.json(
      { message: "Product create successfuly", data: product },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error", err },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDB();
  const allProducts = await productModel.find({});
  return Response.json( allProducts , { status: 200 });
}


export async function PUT(req) {
  try {
    await connectToDB();
    const { id, name, price, count, color, weight, ayaar, type } =
      await req.json();

    if (
      !id ||
      !name ||
      !price ||
      !count ||
      !color ||
      !weight ||
      !ayaar ||
      !type
    ) {
      return new Response(
        JSON.stringify({ error: "All inputs must be complete" }),
        {
          status: 400,
        }
      );
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, count, color, weight, ayaar, type },
      { new: true }
    ); // بازگشت مقدار به‌روز شده)

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: "محصول یافت نشد." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Product updated successfuly" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Unknown Internal Error!",
        error: err,
      }),
      {
        status: 500,
      }
    );
  }
}
