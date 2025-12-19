document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-login");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.querySelector(".name input").value.trim();
    const password = document.querySelector(".pass input").value.trim();

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (username === "admin" && password === "admin@123") {
      alert("Đăng nhập Admin thành công!");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ username: "admin", role: "admin" })
      );
      window.location.href = "./admin/Baocao.html";
      return;
    }

    // Lấy danh sách tài khoản đã lưu
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm tài khoản trùng khớp
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "trangchu.html";
    } else {
      alert("Sai tên tài khoản hoặc mật khẩu!");
    }
  });
});
