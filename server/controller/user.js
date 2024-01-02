// ! Đoạn code dưới đây giúp đăng ký người dùng mới

import User from "../model/user.js";

// * Thư viện giúp sử bất đồng bộ một cách dễ dàng
import AsyncHandler from "express-async-handler";

// ! ĐĂNG KÝ
// * Định nghĩa registerUser và sử dụng AsyncHandler để xử lý bất đồng bộ
export const registerUser = AsyncHandler(async (req, res) => {
  // * Lấy dữ liệu từ Request body. Kiểm tra các trường nếu thiếu trường nào sẽ trả về lỗi
  const { email, password, name, mobile } = req.body;
  if (!email || !password || !name || !mobile) {
    return res.status(401).json({
      success: false,
      message: "registerUser false",
    });
  }
  // * Kiểm tra nếu đã tồn tại
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error(`User ${user.email} is existed ! `);
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: !!newUser,
      mess: newUser ? "creates successfully is already" : "creates failed !",
    });
  }
});

// ! ĐĂNG NHẬP

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({
      success: false,
      mess: "Login failed !",
    });
  }
  const response = await User.findOne({ email: email });
  if (response && (await response.isConrrectPasswords(password))) {
    // plain object
    // Sử dụng toObject() trả về đối tượng thuần
    const { password, role, ...userData } = response.toObject();
    return res.status(200).json({
      success: true,
      userData,
    });
  } else {
    throw new Error("Account not found");
  }
});
