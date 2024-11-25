import connectToDB from "@/config/db";
import userModel from "@/models/User";

export async function PUT(req) {
  try {
    await connectToDB();
    const { userId } = await req.json();

    const user = await userModel.findOne({ _id: userId });

    await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { role: user.role === "USER" ? "ADMIN" : "USER" } }
    );

    return Response.json(
      { message: "Role updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Error" },
      { status: 500 }
    );
  }
}

