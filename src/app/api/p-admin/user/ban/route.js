import connectToDB from "@/config/db";
import BanUsersModel from "@/models/BanUsers";

export async function POST(req) {
  try {
    await connectToDB();
    const { email, phone } = await req.json();

    await BanUsersModel.create({ email, phone });
    return Response.json(
      { message: "User added to Ban list successfuly" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Server Internal Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const BanUsers = await BanUsersModel.find({});
    return Response.json(
      { BanUsers },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unknown Server Internal Error" },
      { status: 500 }
    );
  }
}
