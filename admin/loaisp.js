document.addEventListener("DOMContentLoaded", () => {
  const inputMaLoai = document.querySelector(
    'input[placeholder="Nhập mã loại sản phẩm"]'
  );
  const inputTenLoai = document.querySelector(
    'input[placeholder="Nhập tên loại sản phẩm"]'
  );

  const btnThem = document.querySelector(".nut1");
  const btnSua = document.querySelector(".nut2");
  const btnXoa = document.querySelector(".nut3");
  const tableBody = document.querySelector(".bang");

  let danhSachLoaiSP = JSON.parse(localStorage.getItem("loaisanpham")) || [];
  let indexDangChon = -1;

  // Cập nhật bảng hiển thị
  function capNhatBang() {
    tableBody.innerHTML = `
      <tr>
        <th>Mã loại sản phẩm</th>
        <th>Tên loại sản phẩm</th>
        <th>Thao tác</th>
      </tr>
    `;

    danhSachLoaiSP.forEach((loai, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${loai.ma}</td>
        <td>${loai.ten}</td>
        <td>
          <button class="sua" data-index="${index}">Chỉnh sửa</button>
          <button class="xoa" data-index="${index}">Xóa</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  function xoaForm() {
    inputMaLoai.value = "";
    inputTenLoai.value = "";
    indexDangChon = -1;
  }

  // Thêm loại sản phẩm
  btnThem.addEventListener("click", () => {
    const maLoai = inputMaLoai.value.trim();
    const tenLoai = inputTenLoai.value.trim();

    if (!maLoai || !tenLoai) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const trungMa = danhSachLoaiSP.some((loai) => loai.ma === maLoai);
    if (trungMa) {
      alert("⚠️ Mã loại sản phẩm đã tồn tại, vui lòng nhập mã khác!");
      return;
    }

    danhSachLoaiSP.push({ ma: maLoai, ten: tenLoai });
    localStorage.setItem("loaisanpham", JSON.stringify(danhSachLoaiSP));
    xoaForm();
    capNhatBang();
  });

  // Sửa loại sản phẩm
  btnSua.addEventListener("click", () => {
    if (indexDangChon < 0) {
      alert("Vui lòng chọn loại sản phẩm cần sửa!");
      return;
    }

    const maLoai = inputMaLoai.value.trim();
    const tenLoai = inputTenLoai.value.trim();

    if (!maLoai || !tenLoai) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Kiểm tra trùng mã khi sửa (ngoại trừ chính bản thân)
    const trungMa = danhSachLoaiSP.some(
      (loai, idx) => loai.ma === maLoai && idx !== indexDangChon
    );
    if (trungMa) {
      alert("⚠️ Mã loại sản phẩm đã tồn tại, vui lòng nhập mã khác!");
      return;
    }

    danhSachLoaiSP[indexDangChon] = { ma: maLoai, ten: tenLoai };
    localStorage.setItem("loaisanpham", JSON.stringify(danhSachLoaiSP));
    xoaForm();
    capNhatBang();
  });

  // Xóa loại sản phẩm
  btnXoa.addEventListener("click", () => {
    if (indexDangChon < 0) {
      alert("Vui lòng chọn loại sản phẩm cần xóa!");
      return;
    }

    if (confirm("Bạn có chắc muốn xóa loại sản phẩm này không?")) {
      danhSachLoaiSP.splice(indexDangChon, 1);
      localStorage.setItem("loaisanpham", JSON.stringify(danhSachLoaiSP));
      xoaForm();
      capNhatBang();
    }
  });

  // Xử lý click vào bảng
  tableBody.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("sua")) {
      const loai = danhSachLoaiSP[index];
      inputMaLoai.value = loai.ma;
      inputTenLoai.value = loai.ten;
      indexDangChon = index;
    }

    if (e.target.classList.contains("xoa")) {
      if (confirm("Bạn có chắc muốn xóa loại sản phẩm này không?")) {
        danhSachLoaiSP.splice(index, 1);
        localStorage.setItem("loaisanpham", JSON.stringify(danhSachLoaiSP));
        capNhatBang();
      }
    }
  });
  // Xử lý nút tìm kiếm
  const inputTimKiem = document.getElementById("inputTimKiem");
  const btnTimKiem = document.querySelector(".timkiem button");

  // Hàm lọc theo từ khóa
  btnTimKiem.addEventListener("click", () => {
    const keyword = inputTimKiem.value.trim().toLowerCase();

    if (!keyword) {
      alert("Vui lòng nhập từ khóa tìm kiếm!");
      capNhatBang(); // Hiển thị toàn bộ bảng nếu không nhập gì
      return;
    }

    const ketQua = danhSachLoaiSP.filter(
      (loai) =>
        loai.ma.toLowerCase().includes(keyword) ||
        loai.ten.toLowerCase().includes(keyword)
    );

    // Hiển thị kết quả lọc
    hienThiKetQua(ketQua);
  });

  function hienThiKetQua(ds) {
    tableBody.innerHTML = `
    <tr>
      <th>Mã loại sản phẩm</th>
      <th>Tên loại sản phẩm</th>
      <th>Thao tác</th>
    </tr>
  `;

    ds.forEach((loai, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${loai.ma}</td>
      <td>${loai.ten}</td>
      <td>
        <button class="sua" data-index="${index}">Chỉnh sửa</button>
        <button class="xoa" data-index="${index}">Xóa</button>
      </td>
    `;

      tableBody.appendChild(row);
    });

    if (ds.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="3">Không tìm thấy loại sản phẩm nào!</td>`;
      tableBody.appendChild(row);
    }
  }

  // Khởi tạo giao diện khi tải
  capNhatBang();
});
