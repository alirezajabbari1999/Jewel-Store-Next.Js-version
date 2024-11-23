import connectToDB from "@/config/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectToDB();
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (token) {
      const isValidToken = verifyToken(token);
      if (isValidToken) {
        const user = await userModel.findOne({ email: isValidToken.email });
        return new Response(JSON.stringify(user), { status: 200 });
      }
    }

    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  } catch (err) {
    return Response.json(
      { message: "Unknown Internal Server Error !",err },
      { status: 500 }
    );
  }
}
