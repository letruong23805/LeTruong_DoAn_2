let listKhachHang = JSON.parse(localStorage.getItem("listKhachHang")) || [];
let editingIndex = -1;

// Lấy input
const inputMa = document.querySelector(
  'input[placeholder="Nhập mã khách hàng"]'
);
const inputTen = document.querySelector(
  'input[placeholder="Nhập tên khách hàng"]'
);
const inputSDT = document.querySelector(
  'input[placeholder="Nhập số điện thoại khách hàng"]'
);

const inputEmail = document.querySelector(
  'input[placeholder="Nhập Email khách hàng"]'
);
const inputDiaChi = document.querySelector(
  'input[placeholder="Nhập địa chỉ khách hàng"]'
);
const inputTim = document.querySelector(".timkiem input");

// Lấy button
const btnThem = document.querySelector(".nut1");
const btnSua = document.querySelector(".nut2");
const btnXoa = document.querySelector(".nut3");
const btnTim = document.querySelector(".timkiem button");

// Lấy table
const table = document.querySelector(".bang");

// Lưu vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("listKhachHang", JSON.stringify(listKhachHang));
}

// Render bảng
function renderTable(data = listKhachHang) {
  const rows = data.map(
    (item, index) => `
    <tr>
      <td>${item.ma}</td>
      <td>${item.ten}</td>
      <td>${item.sdt}</td>
      <td>${item.email}</td>
      <td>${item.diachi}</td>
      <td>
        <button class="sua" onclick="editItem(${index})">Chỉnh Sửa</button>
        <button class="xoa" onclick="deleteItem(${index})">Xóa</button>
      </td>
    </tr>
  `
  );
  table.innerHTML = `
    <tr>
      <th>Mã khách hàng</th>
      <th>Tên khách hàng</th>
      <th>Số điện thoại</th>
      <th>Email</th>
      <th>Địa chỉ</th>
      <th>Thao tác</th>
    </tr>
    ${rows.join("")}
  `;
}

// Kiểm tra số điện thoại hợp lệ
function isValidSDT(sdt) {
  const regex = /^\d{10,14}$/;
  return regex.test(sdt);
}

// Thêm khách hàng
btnThem.addEventListener("click", () => {
  const ma = inputMa.value.trim();
  const ten = inputTen.value.trim();
  const sdt = inputSDT.value.trim();
  const email = inputEmail.value.trim();
  const diachi = inputDiaChi.value.trim();

  if (!ma || !ten || !sdt || !email || !diachi) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (!isValidSDT(sdt)) {
    alert("Số điện thoại phải từ 10 đến 14 chữ số!");
    return;
  }

  if (listKhachHang.some((item) => item.ma === ma)) {
    alert("Mã khách hàng đã tồn tại!");
    return;
  }

  listKhachHang.push({ ma, ten, sdt, email, diachi });
  saveToLocalStorage();
  renderTable();
  inputMa.value =
    inputTen.value =
    inputSDT.value =
    inputEmail.value =
    inputDiaChi.value =
      "";
});

// Chỉnh sửa khách hàng
function editItem(index) {
  const item = listKhachHang[index];
  inputMa.value = item.ma;
  inputTen.value = item.ten;
  inputSDT.value = item.sdt;
  inputEmail.value = item.email;
  inputDiaChi.value = item.diachi;
  editingIndex = index;
}

btnSua.addEventListener("click", () => {
  if (editingIndex === -1) {
    alert("Chưa chọn khách hàng để sửa!");
    return;
  }

  const ma = inputMa.value.trim();
  const ten = inputTen.value.trim();
  const sdt = inputSDT.value.trim();
  const email = inputEmail.value.trim();
  const diachi = inputDiaChi.value.trim();

  if (!ma || !ten || !sdt || !email || !diachi) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (!isValidSDT(sdt)) {
    alert("Số điện thoại phải từ 10 đến 14 chữ số!");
    return;
  }

  listKhachHang[editingIndex] = { ma, ten, sdt, email, diachi };
  saveToLocalStorage();
  editingIndex = -1;
  renderTable();
  inputMa.value =
    inputTen.value =
    inputSDT.value =
    inputEmail.value =
    inputDiaChi.value =
      "";
});

// Xóa khách hàng
function deleteItem(index) {
  if (confirm("Bạn có chắc muốn xóa khách hàng này không?")) {
    listKhachHang.splice(index, 1);
    saveToLocalStorage();
    renderTable();
  }
}

btnXoa.addEventListener("click", () => {
  const ma = inputMa.value.trim();
  if (!ma) {
    alert("Vui lòng nhập mã khách hàng cần xóa!");
    return;
  }
  const index = listKhachHang.findIndex((item) => item.ma === ma);
  if (index === -1) {
    alert("Không tìm thấy khách hàng!");
    return;
  }
  deleteItem(index);
  inputMa.value =
    inputTen.value =
    inputSDT.value =
    inputEmail.value =
    inputDiaChi.value =
      "";
});

// Tìm kiếm khách hàng
btnTim.addEventListener("click", () => {
  const keyword = inputTim.value.trim().toLowerCase();
  const result = listKhachHang.filter(
    (item) =>
      item.ma.toLowerCase().includes(keyword) ||
      item.ten.toLowerCase().includes(keyword)
  );
  renderTable(result);
});

// Render bảng khi load trang
renderTable();
