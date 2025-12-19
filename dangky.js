document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-login");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const hoten = document.querySelector(".ho input").value.trim();
    const sdt = document.querySelector(".sdt input").value.trim();
    const email = document.querySelector(".email input").value.trim();
    const username = document.querySelector(".ten input").value.trim();
    const password = document.querySelector(".pass input").value.trim();

    if (!hoten || !sdt || !email || !username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải chứa ít nhất 8 ký tự!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exist = users.find((u) => u.username === username);
    if (exist) {
      alert("Tên tài khoản đã tồn tại, vui lòng chọn tên khác!");
      return;
    }

    // ✔ Lưu vào users
    users.push({ hoten, sdt, email, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    // ✔ Lưu khách hàng
    let listKhachHang = JSON.parse(localStorage.getItem("listKhachHang")) || [];
    const maKH = "KH_" + username;

    listKhachHang.push({
      ma: maKH,
      ten: hoten,
      sdt: sdt,
      email: email,
      diachi: "",
    });
    localStorage.setItem("listKhachHang", JSON.stringify(listKhachHang));

    // ⭐ THÊM QUAN TRỌNG: lưu vào bảng tài khoản
    let taiKhoanList = JSON.parse(localStorage.getItem("taikhoanList")) || [];
    taiKhoanList.push({
      taiKhoan: username,
      matKhau: password,
      loai: "Khách hàng",
    });
    localStorage.setItem("taikhoanList", JSON.stringify(taiKhoanList));

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
    window.location.href = "Dangnhap.html";
  });
});
