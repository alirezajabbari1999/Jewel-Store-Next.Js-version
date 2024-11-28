import connectToDB from "@/config/db";
import discountModel from "@/models/Discount";

export async function PUT(req) {
  try {
    await connectToDB();
    const { code } = await req.json();

    const discount = await discountModel.findOne({ code });

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
      // این کد میره کد تخفیفی که مقدار کد اون برابر با
      // کدی که کاربر وارد کرده هست رو میگیره و مقدار
      // uses
      // اون رو یکی افزایش دادیم
      // inc = increase افزایش
      const updatedDiscount = await discountModel.findOneAndUpdate(
        { code },
        { $inc: { uses: 1 } }
      );
      return Response.json({ updatedDiscount }, { status: 200 });
    }
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}
