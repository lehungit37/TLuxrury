# Platform Quản lý Môi Trường - Website

- Website Platform Quản lý Môi Trường - Công ty cổ phần giải pháp công nghệ Danateq

## Cài đặt

1. Tải về:

   ```bash
   $ git clone git@github.com:Danateq/env_admin_webapp.git
   ```

2. _(Chuyển đến thư mục dự án)_ Cài đặt các phụ thuộc:

   ```bash
   $ yarn install
   ```

3. Chạy website:

   ```bash
   $ yarn start
   ```

## Coding Rules:

- Tất cả các tên thư mục và tên file đều sử dụng underscore style để đặt tên. Ví dụ: user_management, user_dialog.tsx...
- Thêm List phía sau để đặt tên cho các array : customerList, routeList, userList...
- Biến nằm trong thư mục constants thì thêm chữ C phía trước ví dụ: CPath, CRouteList,...
- Import các lib từ node_modules lên đầu, rồi sau đó mới import từ các thư mục trong source code
- Sử dụng PascalCase style để đặt tên cho Class, Component. Ví dụ: CustomerManagement, Permission,...
- Sử dụng camelCase style để đặt tên cho Variables. Thường dùng danh từ để đặt tên cho Variables. Đối với các biến boolean thì hay có "is" hoặc "has" phía trước
- Sử dụng camelCase style để đặt tên cho Function, Method. Sử dụng cụm động từ để đặt tên cho function. Phía trước cụm động từ thì hay có "get", "make", "apply".
- Toàn bộ tên folder, tên file, tên biến, tên function, tên class đều phải đặt tên bằng tiếng anh
- Tất cả các file ảnh, icons... copy vào source code phải được đặt tên lại gợi nhớ bằng tiếng anh và sử dụng underscore style để đặt tên
- Đối với interface khi đặt tên thì thêm chữ I phía trước, ví dụ: ICamera, ICustomer...Đối tới type khi đặt tên thì thêm chữ T phía trước, ví dụ: TControl, TResetPassword...
- Chỉ dùng các màu có thuộc tính là main, light, dark để define các màu trong styles.
