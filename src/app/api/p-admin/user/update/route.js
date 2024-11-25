import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { validateEmail , validatePhone } from "@/utils/auth";

export async function PUT(req) {
  try {
    await connectToDB();
    const { userId, name, email, phone } = await req.json();

    // چک کردن اینکه شناسه کاربر وجود داشته باشد
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const emailValidation = validateEmail(email)
    if(!emailValidation){
      return new Response(JSON.stringify({ error: "Email is wrong!" }), {
        status: 401,
      });
    }
    const phoneValidation = validatePhone(phone)
    if(!phoneValidation){
      return new Response(JSON.stringify({ error: "phone is wrong!" }), {
        status: 402,
      });
    }

    // به‌روزرسانی اطلاعات کاربر در پایگاه داده
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, phone },
    );

    // اگر کاربر پیدا نشد
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // برگرداندن اطلاعات به‌روز شده
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
