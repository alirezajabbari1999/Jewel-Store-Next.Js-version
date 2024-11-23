import connectToDB from "@/config/db";
import discountModel from "@/models/Discount";

export async function POST(req) {
  try {
    connectToDB();
    const { code, percent, maxUse } = await req.json();

    await discountModel.create({ code, percent, maxUse });
    return Response.json(
      { message: "Discount code created successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}
