import connectToDB from "@/config/db";
import discountModel from "@/models/Discount";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const deleteDiscount = await discountModel.findOneAndDelete(id);
    if (!deleteDiscount) {
      return new Response(JSON.stringify({ error: " Discount not found " }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Discount deleted successfuly" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Unknown Internal Error",
        err,
      }),
      { status: 500 }
    );
  }
}
