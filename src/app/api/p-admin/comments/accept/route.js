import connectToDB from "@/config/db";
import commentModel from "@/models/Comment";

export async function PUT(req) {
  try {
    await connectToDB();
    const { commentId } = await req.json();

    const acceptComment = await commentModel.findOneAndUpdate(
      { _id: commentId },
      [{ $set: { isAccept: { $not: "$isAccept" } } }]
    );
    return Response.json({ acceptComment }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Unknown Internal Error" }, { status: 500 });
  }
}
