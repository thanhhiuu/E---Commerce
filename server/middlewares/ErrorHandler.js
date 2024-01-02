// ! Xử lý lỗi khi không tìm thấy đường dẫn => Đường dẫn không đúng !

// notFound được gọi khi không có router nào được xử lý request
export const notFound = (req, res, next) => {
  // Tạo ra đối tượng Error với đường dẫn không tồn tại
  // ${req.originalUrl}  => Lấy ra được đường dẫn đang sai
  const error = new Error(`Router ${req.originalUrl} not found !`);

  // Hiện lỗi 404 thống nhất là lỗi Not found
  res.status(404);

  // Trong Express next() giúp nhảy sang middleware khác tiếp theo trong chuỗi
  // !  Tức trong trường hợp này nó sẽ nhảy tới middleware errorHandler
  // * Từ đó lỗi sẽ được trả về từ errorHandler
  next(error);
};

// ! Xử lý các lỗi chung

// Được gọi ra khi có lỗi xảy ra bất kỳ đâu trong ứng dụng

// ! Bắt buộc phải có đủ 4 tham số truyền vào đúng vị trí  (error, req, res, next) nếu không sẽ lỗi
export const errorHandler = (error, req, res, next) => {
  // Nếu res có lỗi thì mặc định statusCode là 500 => Error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // trả về statusCode response và json
  return res.status(statusCode).json({
    // success = false : Mặc định là có lỗi
    success: false,

    // message = error?.message => Xuất lỗi cụ thể được lấy từ tham số error
    mess: error?.message,
  });
};

// * Mục đích để xuất lỗi rõ ràng không xuất lỗi ra terminal
