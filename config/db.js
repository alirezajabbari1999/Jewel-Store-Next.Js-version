// import mongoose from "mongoose";

// export default async function connectToDB() {
//   try {
//     if (mongoose.connections[0].readyState) {
//       return false;
//     }
//     await mongoose.connect("mongodb://localhost:27017/jewel-store");
//     console.log("Connected to the database successfully");
//   } catch (err) {
//     console.log("Faild to connect to the DB", err);
//   }
// }



import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    // بررسی وضعیت فعلی اتصال
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to the database");
      return false;
    }

    // اتصال به دیتابیس با تنظیمات تایم‌اوت
    await mongoose.connect("mongodb://localhost:27017/jewel-store", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // 30 ثانیه برای تایم‌اوت اتصال
      socketTimeoutMS: 45000, // 45 ثانیه برای ارتباط با سرور
    });

    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}
