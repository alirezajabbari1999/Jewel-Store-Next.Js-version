import connectToDB from "@/config/db";
import productModel from "@/models/Product";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "شناسه محصول ارسال نشده است" }),
        { status: 400 }
      );
    }

    const deletedProduct = await productModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedProduct) {
      return new Response(JSON.stringify({ error: "محصول یافت نشد" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "محصول با موفقیت حذف شد" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Unknown Internal Error!", err }),
      {
        status: 500,
      }
    );
  }
}
