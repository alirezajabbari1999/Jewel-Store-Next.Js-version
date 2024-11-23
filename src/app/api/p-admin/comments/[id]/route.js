import connectToDB from "@/config/db";
import commentModel from "@/models/Comment";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const deletedComment = await commentModel.findByIdAndDelete(id);

    if (!deletedComment) {
      return new Response(JSON.stringify({ error: " Comment not found " }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Comment deleted successfuly" }),
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
