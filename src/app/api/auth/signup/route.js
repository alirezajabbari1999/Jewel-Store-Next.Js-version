import userModel from "@/models/User";
import connectToDB from "@/config/db";
import {
  hashPassword,
  generateToken,
  validateEmail,
  validatePhone,
  validatePassword,
} from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDB();
    const { username, email, phone, password } = await req.json();

    if (
      !username.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !email.trim()
    ) {
      return new Response(
        JSON.stringify({ message: "inputs cant be empty!" }),
        { status: 400 }
      );
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return new Response(
        JSON.stringify({ message: "Phone number is not valid" }),
        { status: 400 }
      );
    }

    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        return new Response(JSON.stringify({ message: "Email is not valid" }), {
          status: 400,
        });
      }
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ message: "Password is not valid" }),
        {
          status: 400,
        }
      );
    }

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (isUserExist) {
      return new Response(
        JSON.stringify({
          message: "This username or email or phone number already exists",
        }),
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const token = generateToken({ email });
    const users = await userModel.find({});

    await userModel.create({
      username,
      phone,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    return Response.json(
      { message: "User added to DB successfuly" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`,
        },
      }
    );
  } catch (err) {
    return Response.json({ message: "Unknown Internal Error =>", err });
  }
}
