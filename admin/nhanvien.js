document.addEventListener("DOMContentLoaded", () => {
  const inputMa = document.querySelector(
    'input[placeholder="Nhập mã nhân viên"]'
  );
  const inputTen = document.querySelector(
    'input[placeholder="Nhập tên nhân viên"]'
  );
  const inputSDT = document.querySelector(
    'input[placeholder="Nhập số điện thoại nhân viên"]'
  );
  const inputEmail = document.querySelector(
    'input[placeholder="Nhập email nhân viên"]'
  );
  const inputDiaChi = document.querySelector(
    'input[placeholder="Nhập địa chỉ nhân viên"]'
  );

  const inputTimKiem = document.querySelector(".timkiem input");
  const btnTimKiem = document.querySelector(".timkiem button");

  const btnThem = document.querySelector(".nut1");
  const btnSua = document.querySelector(".nut2");
  const btnXoa = document.querySelector(".nut3");
  const tableBody = document.querySelector(".bang");

  let danhSachNV = JSON.parse(localStorage.getItem("nhanvien")) || [];
  let indexDangChon = -1;

  function capNhatBang(ds = danhSachNV) {
    tableBody.innerHTML = `
    <tr>
      <th>Mã nhân viên</th>
      <th>Tên nhân viên</th>
      <th>Số điện thoại</th>
      <th>Email</th>
      <th>Địa chỉ</th>
      <th>Thao tác</th>
    </tr>
  `;

    ds.forEach((nv) => {
      const indexGoc = danhSachNV.indexOf(nv); // Lấy đúng chỉ số gốc
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${nv.ma}</td>
      <td>${nv.ten}</td>
      <td>${nv.sdt}</td>
      <td>${nv.email}</td>
      <td>${nv.diachi}</td>
      <td>
        <button class="sua" data-index-goc="${indexGoc}">Chỉnh sửa</button>
        <button class="xoa" data-index-goc="${indexGoc}">Xóa</button>
      </td>
    `;
      tableBody.appendChild(row);
    });
  }

  // Xóa nội dung form
  function xoaForm() {
    inputMa.value = "";
    inputTen.value = "";
    inputSDT.value = "";
    inputEmail.value = "";
    inputDiaChi.value = "";
    indexDangChon = -1;
  }

  // Thêm nhân viên
  btnThem.addEventListener("click", () => {
    const nhanVienMoi = {
      ma: inputMa.value.trim(),
      ten: inputTen.value.trim(),
      sdt: inputSDT.value.trim(),
      email: inputEmail.value.trim(),
      diachi: inputDiaChi.value.trim(),
    };

    if (
      !nhanVienMoi.ma ||
      !nhanVienMoi.ten ||
      !nhanVienMoi.sdt ||
      !nhanVienMoi.email ||
      !nhanVienMoi.diachi
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (danhSachNV.some((nv) => nv.ma === nhanVienMoi.ma)) {
      alert("Mã nhân viên đã tồn tại. Vui lòng nhập mã khác!");
      return;
    }

    // Kiểm tra số điện thoại
    if (!/^\d{10,15}$/.test(nhanVienMoi.sdt)) {
      alert("Số điện thoại phải từ 10 đến 15 chữ số!");
      return;
    }

    danhSachNV.push(nhanVienMoi);
    localStorage.setItem("nhanvien", JSON.stringify(danhSachNV));
    xoaForm();
    capNhatBang();
  });

  // Sửa nhân viên
  btnSua.addEventListener("click", () => {
    if (indexDangChon < 0) {
      alert("Vui lòng chọn nhân viên cần sửa!");
      return;
    }
    const maMoi = inputMa.value.trim();
    const sdtMoi = inputSDT.value.trim();

    // Kiểm tra lại mã (mã không được trùng với nhân viên khác)
    if (
      danhSachNV.some((nv, index) => nv.ma === maMoi && index != indexDangChon)
    ) {
      alert("Mã nhân viên đã tồn tại. Vui lòng nhập mã khác!");
      return;
    }

    // Kiểm tra số điện thoại
    if (!/^\d{10,15}$/.test(sdtMoi)) {
      alert("Số điện thoại phải từ 10 đến 15 chữ số!");
      return;
    }

    danhSachNV[indexDangChon] = {
      ma: inputMa.value.trim(),
      ten: inputTen.value.trim(),
      sdt: inputSDT.value.trim(),
      email: inputEmail.value.trim(),
      diachi: inputDiaChi.value.trim(),
    };

    localStorage.setItem("nhanvien", JSON.stringify(danhSachNV));
    xoaForm();
    capNhatBang();
  });

  // Xóa nhân viên
  btnXoa.addEventListener("click", () => {
    if (indexDangChon < 0) {
      alert("Vui lòng chọn nhân viên cần xóa!");
      return;
    }

    danhSachNV.splice(indexDangChon, 1);
    localStorage.setItem("nhanvien", JSON.stringify(danhSachNV));
    xoaForm();
    capNhatBang();
  });

  // Tìm kiếm nhân viên theo mã hoặc tên
  btnTimKiem.addEventListener("click", () => {
    const keyword = inputTimKiem.value.trim().toLowerCase();
    if (!keyword) {
      alert("Vui lòng nhập từ khóa tìm kiếm");
      return;
    }

    const ketQua = danhSachNV.filter(
      (nv) =>
        nv.ma.toLowerCase().includes(keyword) ||
        nv.ten.toLowerCase().includes(keyword)
    );

    if (ketQua.length > 0) {
      capNhatBang(ketQua);
    } else {
      alert("Không tìm thấy nhân viên phù hợp!");
      capNhatBang([]); // Hiển thị bảng rỗng nếu không tìm thấy
    }
  });

  // Bắt sự kiện click để sửa hoặc xóa
  tableBody.addEventListener("click", (e) => {
    const indexGoc = e.target.dataset.indexGoc;
    if (e.target.classList.contains("sua")) {
      const nv = danhSachNV[indexGoc];
      inputMa.value = nv.ma;
      inputTen.value = nv.ten;
      inputSDT.value = nv.sdt;
      inputEmail.value = nv.email;
      inputDiaChi.value = nv.diachi;
      indexDangChon = indexGoc; // Lưu lại chỉ số gốc
    }

    if (e.target.classList.contains("xoa")) {
      if (confirm("Bạn có chắc muốn xóa nhân viên này không?")) {
        danhSachNV.splice(indexGoc, 1);
        localStorage.setItem("nhanvien", JSON.stringify(danhSachNV));
        capNhatBang();
      }
    }
  });

  capNhatBang();
});
