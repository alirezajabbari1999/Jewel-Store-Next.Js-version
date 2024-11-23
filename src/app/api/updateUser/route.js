import connectToDB from "@/config/db";
import userModel from "@/models/User";
import { authUser } from "@/utils/serverHelpers";
import { validateEmail, validatePhone } from "@/utils/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    connectToDB();
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const image = formData.get("image");

    const user = await authUser();

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
      return Response.json(
        { message: "Email format is not valid" },
        { status: 400 }
      );
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation) {
      return Response.json(
        { message: "Phone number format is not valid" },
        { status: 401 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + image.name;

    await writeFile(
      path.join(process.cwd(), "public/uploades/" + filename),
      buffer
    );


    await userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
          image: `http://localhost:3000/uploades/${filename}`,
        },
      }
    );

    return Response.json(
      { message: "User info updated successfuly" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Server Error!" },
      { status: 500 }
    );
  }
}
