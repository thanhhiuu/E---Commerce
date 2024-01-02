import userRouter from "./user.js";
import { notFound, errorHandler } from "../middlewares/ErrorHandler.js";
const initRouter = (app) => {
  app.use("/api/user", userRouter);

  app.use(notFound);
  app.use(errorHandler);
};
export default initRouter;

// * Nguyên lý hoạt động của 2 middlewares { notFound, errorHandler }
// ~ request sẽ đi qua tất cả các Middlewares
// ^ Ví Dụ : app.use("/api/user", userRouter); đây là 1 middlewares được đăng ký
// ~ Nếu nó request tới middlewares nào mà không được (Không tim ra) thì sẽ trả về Not Found
// ^ Còn về errorHandler, nếu có bất kỳ lỗi ở đâu sẽ nhảy tới ngay middlewares errorHandler
