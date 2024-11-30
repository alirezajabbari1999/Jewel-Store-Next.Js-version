import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect("mongodb://localhost:27017/jewel-store", {
      connectTimeoutMS: 60000, // تایم‌اوت اتصال به 60 ثانیه افزایش یابد
      socketTimeoutMS: 120000, // تایم‌اوت سوکت به 120 ثانیه افزایش یابد
      serverSelectionTimeoutMS: 5000, // مدت‌زمان برای انتخاب سرور
    });
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log("Faild to connect to the DB", err);
  }
}


