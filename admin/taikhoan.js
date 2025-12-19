document.addEventListener("DOMContentLoaded", () => {
  const inputTaiKhoan = document.querySelector(
    "input[placeholder='Nhập tài khoản']"
  );
  const inputMatKhau = document.querySelector(
    "input[placeholder='Nhập mật khẩu']"
  );
  const inputLoaiTaiKhoan = document.querySelector(
    "input[placeholder='Nhập loại tài khoản']"
  );
  const btnThem = document.querySelector(".nut1");
  const btnSua = document.querySelector(".nut2");
  const btnXoa = document.querySelector(".nut3");
  const table = document.querySelector(".bang");
  const searchInput = document.querySelector(".timkiem input");
  const searchBtn = document.querySelector(".timkiem button");

  let currentEditIndex = null;
  let taiKhoanList = JSON.parse(localStorage.getItem("taikhoanList")) || [];

  // Hiển thị danh sách tài khoản lên bảng
  function renderTable() {
    const rows = table.querySelectorAll("tr:not(:first-child)");
    rows.forEach((row) => row.remove());

    taiKhoanList.forEach((tk, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${tk.taiKhoan}</td>
        <td>${tk.matKhau}</td>
        <td>${tk.loai}</td>
        <td>
          <button class="sua" data-index="${index}">Chỉnh sửa</button>
          <button class="xoa" data-index="${index}">Xóa</button>
        </td>
      `;
      table.appendChild(tr);
    });
  }

  renderTable();

  // Thêm tài khoản
  btnThem.addEventListener("click", () => {
    const taiKhoan = inputTaiKhoan.value.trim();
    const matKhau = inputMatKhau.value.trim();
    const loai = inputLoaiTaiKhoan.value.trim();

    if (!taiKhoan || !matKhau || !loai) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    taiKhoanList.push({ taiKhoan, matKhau, loai });
    localStorage.setItem("taikhoanList", JSON.stringify(taiKhoanList));
    renderTable();

    alert("Đã thêm tài khoản!");
    inputTaiKhoan.value = inputMatKhau.value = inputLoaiTaiKhoan.value = "";
  });

  // Xử lý nút sửa và xóa
  table.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("xoa")) {
      if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
        taiKhoanList.splice(index, 1);
        localStorage.setItem("taikhoanList", JSON.stringify(taiKhoanList));
        renderTable();
      }
    }

    if (e.target.classList.contains("sua")) {
      currentEditIndex = index;
      const tk = taiKhoanList[index];
      inputTaiKhoan.value = tk.taiKhoan;
      inputMatKhau.value = tk.matKhau;
      inputLoaiTaiKhoan.value = tk.loai;
    }
  });

  // Sửa tài khoản
  btnSua.addEventListener("click", () => {
    if (currentEditIndex === null) {
      alert("Vui lòng chọn tài khoản cần chỉnh sửa!");
      return;
    }

    const taiKhoan = inputTaiKhoan.value.trim();
    const matKhau = inputMatKhau.value.trim();
    const loai = inputLoaiTaiKhoan.value.trim();

    if (!taiKhoan || !matKhau || !loai) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    taiKhoanList[currentEditIndex] = { taiKhoan, matKhau, loai };
    localStorage.setItem("taikhoanList", JSON.stringify(taiKhoanList));
    renderTable();

    alert("Đã sửa tài khoản!");
    inputTaiKhoan.value = inputMatKhau.value = inputLoaiTaiKhoan.value = "";
    currentEditIndex = null;
  });

  // Xóa toàn bộ
  btnXoa.addEventListener("click", () => {
    if (confirm("Bạn có muốn xóa tất cả tài khoản không?")) {
      taiKhoanList = [];
      localStorage.setItem("taikhoanList", JSON.stringify(taiKhoanList));
      renderTable();
    }
  });

  // Tìm kiếm tài khoản
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const rows = table.querySelectorAll("tr:not(:first-child)");

    rows.forEach((row) => {
      const taiKhoan = row.cells[0].innerText.toLowerCase();
      row.style.display = taiKhoan.includes(keyword) ? "" : "none";
    });
  });
});
