import connectToDB from "@/config/db";
import SubMenuModel from "@/models/SubMenu";
import CategoryModel from "@/models/Category";

export async function POST(req) {
  try {
    await connectToDB();
    const { name, categoryId } = await req.json();

    if (!name) {
      return Response.json(
        { message: "SubMenu name is required!!" },
        { status: 400 }
      );
    }

    const newSubMenu = await SubMenuModel.create({ name, categoryId });
    await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      { $push: { subMenu: newSubMenu._id } }
    );

    return Response.json(newSubMenu, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: "Unlnown Internal Error!!", err },
      { status: 500 }
    );
  }
}
