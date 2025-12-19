document.addEventListener("DOMContentLoaded", () => {
  // Lấy dữ liệu giỏ hàng từ localStorage
  let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

  const danhSach = document.querySelector(".thanghfg");
  const tongTienSpan = document.getElementById("tongtien");
  const btnXoaToanBo = document.getElementById("xoa-toan-bo");

  // Nếu sản phẩm chưa có trường số lượng thì thêm mặc định = 1
  giohang = giohang.map((sp) => {
    if (!sp.soluong) sp.soluong = 1;
    return sp;
  });

  // Hàm tính tổng tiền
  function tinhTongTien() {
    let tong = 0;
    giohang.forEach((sp) => {
      const giaSo = parseInt(sp.gia.replace(/\D/g, "")) * sp.soluong;
      tong += giaSo;
    });
    tongTienSpan.innerText = tong.toLocaleString("vi-VN") + "đ";
  }

  // Hàm hiển thị giỏ hàng
  function hienThiGioHang() {
    danhSach.innerHTML = ""; // xóa nội dung cũ
    giohang.forEach((sp, index) => {
      const spDiv = document.createElement("div");
      spDiv.classList.add("sanpham-giohang");
      spDiv.style.display = "flex";
      spDiv.style.alignItems = "center";
      spDiv.style.marginBottom = "10px";
      spDiv.style.borderBottom = "1px solid #ddd";
      spDiv.style.paddingBottom = "10px";

      spDiv.innerHTML = `
        <img src="${sp.anh}" alt="${sp.ten}" width="100" style="margin-right:15px;">
        <div style="flex-grow:1">
          <p>${sp.ten}</p>
          <p>${sp.gia}</p>
        </div>
        <div class="soluong" data-index="${index}" style="display:flex;align-items:center;gap:10px;margin-right:40px;">
          <button class="giam" style="width:20px;height:20px;">-</button>
          <span>${sp.soluong}</span>
          <button class="tang" style="width:20px;height:20px;">+</button>
        </div>
        <button class="xoa" data-index="${index}"style=" background-color: red;color: white;border: none;border-radius: 5px; padding:5px 10px; cursor: pointer; font-size: 16px;">Xóa</button>`;
      danhSach.appendChild(spDiv);
    });
    tinhTongTien();
  }

  hienThiGioHang();

  // Xử lý tăng / giảm / xóa sản phẩm
  danhSach.addEventListener("click", (e) => {
    const index = e.target.closest("[data-index]")?.dataset.index;

    // Tăng số lượng
    if (e.target.classList.contains("tang")) {
      giohang[index].soluong++;
      localStorage.setItem("giohang", JSON.stringify(giohang));
      hienThiGioHang();
    }

    // Giảm số lượng
    if (e.target.classList.contains("giam")) {
      if (giohang[index].soluong > 1) {
        giohang[index].soluong--;
      } else {
        if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
          giohang.splice(index, 1);
        }
      }
      localStorage.setItem("giohang", JSON.stringify(giohang));
      hienThiGioHang();
    }

    // Xóa sản phẩm
    if (e.target.classList.contains("xoa")) {
      giohang.splice(index, 1);
      localStorage.setItem("giohang", JSON.stringify(giohang));
      hienThiGioHang();
    }
  });

  // Xóa toàn bộ sản phẩm
  btnXoaToanBo.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa toàn bộ sản phẩm?")) {
      giohang = [];
      localStorage.setItem("giohang", JSON.stringify(giohang));
      hienThiGioHang();
    }
  });
  // Xử lý đặt đơn hàng
  const btnDatDon = document.getElementById("dat-don-hang");

  btnDatDon.addEventListener("click", () => {
    if (giohang.length === 0) {
      alert(
        "Giỏ hàng chưa có sản phẩm! Vui lòng thêm sản phẩm trước khi đặt hàng."
      );
      window.location.href = "trangchu.html";
    } else {
      window.location.href = "donhang.html";
    }
  });
});
