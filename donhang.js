document.addEventListener("DOMContentLoaded", () => {
  let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

  const danhSach = document.getElementById("danhsach-sanpham");
  const tongTien = document.getElementById("tong-tien");
  const btnDatHang = document.querySelector(".khungdh button");

  const inputTen = document.querySelector(
    'input[placeholder="Họ tên người nhận."]'
  );
  const inputSDT = document.querySelector('input[placeholder="1234567890"]');
  const inputEmail = document.querySelector(
    'input[placeholder="Nhập Email của bạn."]'
  );
  const inputDiaChi = document.querySelector(
    'input[placeholder="Nhập địa chỉ nhận hàng."]'
  );
  const inputGhiChu = document.querySelector("textarea");

  function hienThiDonHang() {
    danhSach.innerHTML = "";
    let tong = 0;

    giohang.forEach((sp) => {
      const giaSo = parseInt(sp.gia.replace(/\D/g, "")) * (sp.soluong || 1);
      tong += giaSo;

      const item = document.createElement("div");
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.marginBottom = "10px";
      item.innerHTML = `
        <img src="${sp.anh}" alt="${
        sp.ten
      }" width="80" style="margin-right:10px;">
        <div>
          <p><strong>${sp.ten}</strong></p>
          <p>Giá: ${sp.gia}</p>
          <p>Số lượng: ${sp.soluong || 1}</p>
        </div>
      `;
      danhSach.appendChild(item);
    });

    tongTien.textContent = tong.toLocaleString("vi-VN") + "đ";
  }

  hienThiDonHang();

  // 🔥 Khi bấm ĐẶT HÀNG
  btnDatHang.addEventListener("click", () => {
    if (
      inputTen.value.trim() === "" ||
      inputSDT.value.trim() === "" ||
      inputDiaChi.value.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }
    // if (!/^\d{10}$/.test(inputSDT.value.trim())) {
    //   alert("Số điện thoại phải nhập đủ 10 chữ số");
    //   return;
    // }

    alert(
      `Cảm ơn bạn, đơn hàng sẽ được giao tới:\n${inputDiaChi.value}\nsớm nhất có thể!`
    );

    // Xóa giỏ hàng
    localStorage.removeItem("giohang");
    giohang = [];
    hienThiDonHang();

    //Làm mới hết dữ liệu người dùng nhập
    inputTen.value = "";
    inputSDT.value = "";
    inputEmail.value = "";
    inputDiaChi.value = "";
    inputGhiChu.value = "";
  });
});
