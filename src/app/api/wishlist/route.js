import connectToDB from "@/config/db";
import wishlistModel from "@/models/Wishlist";

export async function POST(req) {
  await connectToDB();
  try {
    const { user, product } = await req.json();

    const wish = await wishlistModel.findOne({ user, product });
    if (!wish) {
      await wishlistModel.create({ user, product });
    }

    return Response.json(
      { message: "product added to wishlist successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error", err },
      { status: 500 }
    );
  }
}
