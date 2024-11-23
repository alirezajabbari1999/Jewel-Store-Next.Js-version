import connectToDB from "@/config/db";
import commentModel from "@/models/Comment";

export async function PUT(req) {
  try {
    await connectToDB();
    const { id, body } = await req.json();

    if (!id || !body) {
      return new Response(
        JSON.stringify({ error: "All inputs must be complete" }),
        {
          status: 400,
        }
      );
    }

    const updatedComment = await commentModel.findByIdAndUpdate(
      id,
      { body },
      { new: true } // بازگشت مقدار به‌روز شده)
    ); 

    if (!updatedComment) {
      return new Response(JSON.stringify({ error: "Comment not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Product updated successfuly" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Unknown Internal Error!",
        error: err,
      }),
      {
        status: 500,
      }
    );
  }
}
