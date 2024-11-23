import connectToDB from "@/config/db";
import userModel from "@/models/User";
import {
  verifyPassword,
  generateToken,
  generateRefreshToken,
} from "@/utils/auth";


export async function POST(req) {
  try {
    connectToDB();
    const { identifier, password } = await req.json();

    if (!identifier.trim() || !password.trim()) {
      return new Response(
        JSON.stringify({ message: "All inputs must be complete" }),
        { status: 422 }
      );
    }

    const isUserExist = await userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!isUserExist) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const isValidPassword = await verifyPassword(
      password,
      isUserExist.password
    );
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ message: "username or password is not correct !!" }),
        {
          status: 401,
        }
      );
    }

    const token = generateToken({ email: isUserExist.email });
    const refreshToken = generateRefreshToken({ email: isUserExist.email });
    await userModel.findOneAndUpdate(
      { email: identifier },
      {
        $set: {
          refreshToken: refreshToken,
        },
      }
    );

    return new Response(JSON.stringify({ message: "User login successfuly" }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`,
      },
    });
    
  } catch (err) {
    return Response.json({ message: "Unknown Internal Error =>", err });
  }
}
