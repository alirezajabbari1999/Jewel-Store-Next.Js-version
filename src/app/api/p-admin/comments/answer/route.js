import connectToDB from "@/config/db";
import commentModel from "@/models/Comment";
import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, body, email, score, productID, user, replyTo } =
      await req.json();

    const userInfo = await authUser();

    await commentModel.create({
      username,
      body,
      email,
      score,
      productID,
      user,
      replyTo,
      sendBy: userInfo._id,
    });

    return Response.json(
      { message: "Comment answer send successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: "Unknown Internal Error" }, { status: 500 });
  }
}
