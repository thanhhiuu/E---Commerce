// ! Đoạn code dưới đây giúp đăng ký người dùng mới
// !

import User from "../model/user.js";

// * Thư viện giúp sử bất đồng bộ một cách dễ dàng
import AsyncHandler from "express-async-handler";

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

  // * Gọi create để tạo mới 1 User
  const response = await User.create(req.body);

  // * Nếu thành công trả về status 200
  return res.status(200).json({
    success: true,
    response,
  });
});
