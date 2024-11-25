import connectToDB from "@/config/db";
import { verifyToken } from "./auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export const authUser = async () => {
  await connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  if (token) {
    const tokenVerify = verifyToken(token);
    if (tokenVerify) {
      user = await UserModel.findOne({ email: tokenVerify.email });
    }
  }

  return user;
};
