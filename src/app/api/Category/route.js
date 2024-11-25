import categoryModel from "@/models/Category";
import connectToDB from "@/config/db";

export async function POST(req) {
  try {
    await connectToDB();
    const { title, subMenuIds } = await req.json();

    if (!title) {
      return Response.json(
        { message: "Categoru title is required!!" },
        { status: 400 }
      );
    }

    await categoryModel.create({
      title,
      subMenu: subMenuIds || [], // ساب‌منوها به صورت اختیاری هستند
    });

    return Response.json(
      { message: "Category added successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unlnown Internal Error!!", err },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    await connectToDB();
    const categories = await categoryModel.find({},"-__v").populate("subMenu");

    return Response.json(categories, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unlnown Internal Error!!", error: err },
      { status: 500 }
    );
  }
}
