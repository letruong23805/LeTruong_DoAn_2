document.addEventListener("DOMContentLoaded", () => {
  const inputMa = document.querySelector(
    'input[placeholder="Nhập mã nhà cung cấp"]'
  );
  const inputTen = document.querySelector(
    'input[placeholder="Nhập tên nhà cung cấp"]'
  );
  const inputSDT = document.querySelector(
    'input[placeholder="Nhập số điện thoại nhà cung cấp"]'
  );
  const inputEmail = document.querySelector(
    'input[placeholder="Nhập email nhà cung cấp"]'
  );
  const inputDiaChi = document.querySelector(
    'input[placeholder="Nhập địa chỉ nhà cung cấp"]'
  );

  const btnThem = document.querySelector(".nut1");
  const btnSua = document.querySelector(".nut2");
  const btnXoa = document.querySelector(".nut3");
  const tableBody = document.querySelector(".bang");

  let danhSachNCC = JSON.parse(localStorage.getItem("nhacungcap")) || [];
  let indexDangChon = -1; // vị trí dòng đang chỉnh sửa

  function capNhatBang() {
    tableBody.innerHTML = `
      <tr>
        <th>Mã nhà cung cấp</th>
        <th>Tên nhà cung cấp</th>
        <th>Số điện thoại</th>
        <th>Email</th>
        <th>Địa chỉ</th>
        <th>Thao tác</th>
      </tr>
    `;

    danhSachNCC.forEach((ncc, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${ncc.ma}</td>
        <td>${ncc.ten}</td>
        <td>${ncc.sdt}</td>
        <td>${ncc.email}</td>
        <td>${ncc.diachi}</td>
        <td>
          <button class="sua" data-index="${index}">Chỉnh sửa</button>
          <button class="xoa" data-index="${index}">Xóa</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  function xoaForm() {
    inputMa.value = "";
    inputTen.value = "";
    inputSDT.value = "";
    inputEmail.value = "";
    inputDiaChi.value = "";
    indexDangChon = -1;
  }
  function kiemTraSoDienThoai(sdt) {
    return /^\d{10,15}$/.test(sdt);
  }
  //Thêm nhà cung cấp
  btnThem.addEventListener("click", () => {
    const nccMoi = {
      ma: inputMa.value.trim(),
      ten: inputTen.value.trim(),
      sdt: inputSDT.value.trim(),
      email: inputEmail.value.trim(),
      diachi: inputDiaChi.value.trim(),
    };

    if (Object.values(nccMoi).some((val) => !val)) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (danhSachNCC.some((ncc) => ncc.ma === nccMoi.ma)) {
      alert("Mã nhà cung cấp đã tồn tại!");
      return;
    }

    if (!kiemTraSoDienThoai(nccMoi.sdt)) {
      alert("Số điện thoại phải từ 10 đến 15 chữ số!");
      return;
    }

    danhSachNCC.push(nccMoi);
    localStorage.setItem("nhacungcap", JSON.stringify(danhSachNCC));
    xoaForm();
    capNhatBang();
  });

  // Sửa nhà cung cấp
  btnSua.addEventListener("click", () => {
    if (indexDangChon < 0) {
      alert("Vui lòng chọn nhà cung cấp cần sửa!");
      return;
    }

    const maMoi = inputMa.value.trim();
    const sdtMoi = inputSDT.value.trim();

    if (
      danhSachNCC.some(
        (ncc, index) => ncc.ma === maMoi && index !== indexDangChon
      )
    ) {
      alert("Mã nhà cung cấp đã tồn tại, không thể sửa!");
      return;
    }

    if (!kiemTraSoDienThoai(sdtMoi)) {
      alert("Số điện thoại phải từ 10 đến 15 chữ số!");
      return;
    }

    danhSachNCC[indexDangChon] = {
      ma: maMoi,
      ten: inputTen.value.trim(),
      sdt: sdtMoi,
      email: inputEmail.value.trim(),
      diachi: inputDiaChi.value.trim(),
    };

    localStorage.setItem("nhacungcap", JSON.stringify(danhSachNCC));
    xoaForm();
    capNhatBang();
  });

  // Xóa nhà cung cấp
  btnXoa.addEventListener("click", () => {
    if (indexDangChon < 0) {
      alert("Vui lòng chọn nhà cung cấp cần xóa!");
      return;
    }

    danhSachNCC.splice(indexDangChon, 1);
    localStorage.setItem("nhacungcap", JSON.stringify(danhSachNCC));
    xoaForm();
    capNhatBang();
  });

  // Chọn dòng để sửa hoặc xóa
  tableBody.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("sua")) {
      const ncc = danhSachNCC[index];
      inputMa.value = ncc.ma;
      inputTen.value = ncc.ten;
      inputSDT.value = ncc.sdt;
      inputEmail.value = ncc.email;
      inputDiaChi.value = ncc.diachi;
      indexDangChon = index;
    }

    if (e.target.classList.contains("xoa")) {
      if (confirm("Bạn có chắc muốn xóa nhà cung cấp này không?")) {
        danhSachNCC.splice(index, 1);
        localStorage.setItem("nhacungcap", JSON.stringify(danhSachNCC));
        capNhatBang();
      }
    }
  });
  // Tìm kiếm nhà cung cấp
  const inputTimKiem = document.querySelector(".timkiem input");
  const btnTimKiem = document.querySelector(".timkiem button");

  btnTimKiem.addEventListener("click", () => {
    const keyword = inputTimKiem.value.trim().toLowerCase();

    if (!keyword) {
      alert("Vui lòng nhập từ khóa tìm kiếm!");
      capNhatBang(); // Nếu không nhập từ khóa, hiển thị lại toàn bộ
      return;
    }

    const ketQua = danhSachNCC.filter(
      (ncc) =>
        ncc.ma.toLowerCase().includes(keyword) ||
        ncc.ten.toLowerCase().includes(keyword)
    );

    hienThiKetQua(ketQua);
  });

  function hienThiKetQua(ds) {
    tableBody.innerHTML = `
      <tr>
        <th>Mã nhà cung cấp</th>
        <th>Tên nhà cung cấp</th>
        <th>Số điện thoại</th>
        <th>Email</th>
        <th>Địa chỉ</th>
        <th>Thao tác</th>
      </tr>
    `;

    if (ds.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="6">Không tìm thấy nhà cung cấp nào!</td>`;
      tableBody.appendChild(row);
      return;
    }

    ds.forEach((ncc, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ncc.ma}</td>
        <td>${ncc.ten}</td>
        <td>${ncc.sdt}</td>
        <td>${ncc.email}</td>
        <td>${ncc.diachi}</td>
        <td>
          <button class="sua" data-index="${index}">Chỉnh sửa</button>
          <button class="xoa" data-index="${index}">Xóa</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  capNhatBang();
});
