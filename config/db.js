// import mongoose from "mongoose";

// export default async function connectToDB() {
//   try {
//     if (mongoose.connections[0].readyState) {
//       return false;
//     }
//     await mongoose.connect("mongodb://localhost:27017/jewel-store", {
//       connectTimeoutMS: 60000, // تایم‌اوت اتصال به 60 ثانیه افزایش یابد
//       socketTimeoutMS: 120000, // تایم‌اوت سوکت به 120 ثانیه افزایش یابد
//       serverSelectionTimeoutMS: 5000, // مدت‌زمان برای انتخاب سرور
//     });
//     console.log("Connected to the database successfully");
//   } catch (err) {
//     console.log("Faild to connect to the DB", err);
//   }
// }




// import mongoose from "mongoose";

// export default async function connectToDB() {
//   try {
//     // اگر قبلاً به دیتابیس متصل شده باشیم، دوباره تلاش نمی‌کنیم.
//     if (mongoose.connections[0].readyState) {
//       return;
//     }

//     // استفاده از URI از فایل .env
//     const mongoURI = process.env.MONGODB_URI;

//     // اتصال به دیتابیس
//     await mongoose.connect(mongoURI, {
//       connectTimeoutMS: 60000,  // تایم‌اوت اتصال به 60 ثانیه
//       socketTimeoutMS: 120000,  // تایم‌اوت سوکت به 120 ثانیه
//       serverSelectionTimeoutMS: 5000,  // مدت‌زمان برای انتخاب سرور
//     });

//     console.log("Connected to the database successfully");
//   } catch (err) {
//     console.error(`Failed to connect to the DB: ${err.message}`);
//   }
// }



import mongoose from 'mongoose';
import productModel from "@/models/Product"

export default async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 60000,
      socketTimeoutMS: 120000,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Database connection error: ", err);
  }
}
