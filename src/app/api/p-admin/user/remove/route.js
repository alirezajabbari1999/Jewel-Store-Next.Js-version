import connectToDB from "@/config/db";
import UserModel from "@/models/User";

// این 
// api
// رو برای دکمه حذفی که در صفحه یوزرهای پنل ادمین هست نوشتم
// اما هر کاری کردم با متود
// DELETE
// کار نکرد و مجبور شدم از 
// POST
// استفاده کنم
export async function POST(req) {
  try {
    connectToDB();
    const { userId } = await req.json();

    await UserModel.findOneAndDelete({ _id: userId });
    return Response.json(
      { message: "User removed successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
