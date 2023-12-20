import mongoose from "mongoose";

// Hàm giúp kết nối với mongoose
const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);

    // Kiểm tra lỗi kết nối
    if (db.connection.readyState == 1) {
      console.log("Đã Kết Nối MongoDB");
    } else {
      console.log("Lỗi Kết Nối MongoDB");
    }
  } catch (error) {
    console.log("Lỗi Kết Nối MongoDB");
    throw new Error(error);
  }
};

export default dbConnect;
