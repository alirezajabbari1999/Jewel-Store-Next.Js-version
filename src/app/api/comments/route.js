import connectToDB from "@/config/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    connectToDB();
    const { username, body, email, score, productID} = await req.json();

    if (
      !username.trim() ||
      !body.trim() ||
      !email.trim() ||
      !score ||
      !productID.trim()
    ) {
      return Response.json(
        { message: "All inputs must to be complete!" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      const isValidToken = verifyToken(token);
      if (isValidToken) {
        const user = await userModel.findOne({ email: isValidToken.email });

        const comment = await commentModel.create({
          username,
          body,
          email,
          score,
          productID,
          user: user._id,
        });

        await productModel.findOneAndUpdate(
          { _id: productID },
          {
            $push: {
              comments: comment._id,
            },
          }
        );

        return Response.json(
          { message: "Comments created successfuly", data: comment },
          { status: 201 }
        );
      }
    }
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error", err },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    connectToDB();
    const comments = await commentModel.find({});
    return Response.json({ comments }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error", err },
      { status: 500 }
    );
  }
}
