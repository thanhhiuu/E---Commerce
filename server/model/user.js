import mongoose from "mongoose"; // Erase if already required
import bcrypt from "bcrypt"; //
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },

    // ! Khóa Phụ -> Thông qua Id của mongoose để lấy ra địa chỉ
    address: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Address",
      },
    ],
    // ! Khóa Phụ -> Thông qua Id của mongoose để lấy ra sản phẩm mà user yêu thích
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    // ! Khóa Phụ -> Tài khoản có bị khóa hay chưa mặc định true
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // ! Lưu token của user vào DB
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  // ! Tự động cập nhật các trường createdAt (Tgian tạo ra document) và updatedAt (Tgian cập nhật ra document) cho mỗi document
  { timestamps: true }
);

// Trước khi lưu vào DB thực hiện các hành động (pre => thực hiện trước khi lưu)

// * Đoạn code này giúp mã hóa password
// * Dùng middleware pre trong mongoose

// ! Không dùng được hàm mũi tên khi dùng this
// ^ pre => save (giúp xử lý tình huống trước khi lưu vào database thì thực hiện pre này trước)
userSchema.pre("save", async function (next) {
  // * Kiểm tra nếu password không thay đổi thì không làm gì cả.
  // * Còn nếu thay đổi thì tiếp tụi mã hóa password
  if (this.isModified("password")) {
    // Next giúp nhảy sang bước khác
    next();
  }
  // * Tạo ra chuỗi ngẫu nhiên 10 ký tự để làm muối
  const salt = await bcrypt.genSaltSync(10);

  // ~ Tham chiếu đến docs mongoose có trong Db muốn mã hóa
  // ~ Trong hàm  bcrypt.hash() this là giá trị ban đầu của docs
  // * bcrypt.hash => Dùng để băm code kết hợp với hàm salt đã tạo từ đó tạo ra mã có 10 ký tự ngẫu nhiên
  // ^ Sau khi mã hóa thành công sẽ update lại password với mã đã được mã hóa (This.password)
  this.password = await bcrypt.hash(this.password, salt);
});

// ! Như vậy, khi lưu user vào DB, password sẽ được mã hóa và không lưu dưới dạng plaintext.
// ! Đây là cách để bảo mật mật khẩu người dùng.

// ! Khi đăng nhập, sẽ so sánh password người dùng nhập vào với password đã được mã hóa trong DB để xác thực.
//Export the model

userSchema.methods = {
  isConrrectPasswords: async function (password) {
    return await bcrypt.compareSync(password, this.password);
  },
};
export default mongoose.model("User", userSchema);
