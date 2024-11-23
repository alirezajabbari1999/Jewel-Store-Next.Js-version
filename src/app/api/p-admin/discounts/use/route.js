import connectToDB from "@/config/db";
import discountModel from "@/models/Discount";

export async function PUT(req) {
  try {
    connectToDB();
    const { code } = await req.json();

    const discount = await discountModel.findOne({ code });

    // این کد میره کد تخفیفی که مقدار کد اون برابر با
    // کدی که کاربر وارد کرده هست رو میگیره و مقدار
    // uses
    // اون رو یکی افزایش دادیم
    // inc = increase افزایش
    await discountModel.findOneAndUpdate({ code }, { $inc: { uses: 1 } });

    if (!discount) {
      return Response.json(
        { message: "Discount code not found" },
        { status: 404 }
      );
    } else if (discount.maxUse === discount.uses) {
      return Response.json(
        { message: "Discount code expire" },
        { status: 422 }
      );
    } else {
      return Response.json({ discount }, { status: 200 });
    }
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}
