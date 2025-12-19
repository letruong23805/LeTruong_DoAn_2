let listBaoHanh = JSON.parse(localStorage.getItem("listBaoHanh")) || [];
let listLoaiBaoHanh = JSON.parse(localStorage.getItem("listLoaiBaoHanh")) || [];
let listKhachHang = JSON.parse(localStorage.getItem("listKhachHang")) || [];
let editingIndex = -1;

// ==================== LẤY INPUT ====================
const inputMa = document.querySelector('input[placeholder="Nhập mã bảo hành"]');
const selectLoai = document.querySelector("#lbh");
const inputMaMay = document.querySelector(
  'input[placeholder="Nhập mã máy tính"]'
);
const selectKH = document.querySelector("#kh");
const inputNgayBD = document.querySelectorAll('input[type="date"]')[0];
const inputNgayKT = document.querySelectorAll('input[type="date"]')[1];
const inputTim = document.querySelector(".timkiem input");

// ==================== LẤY BUTTON ====================
const btnThem = document.querySelector(".nut1");
const btnSua = document.querySelector(".nut2");
const btnXoa = document.querySelector(".nut3");
const btnTim = document.querySelector(".timkiem button");

// ==================== LẤY BẢNG ====================
const table = document.querySelector(".bang");

// ==================== LƯU LOCAL ====================
function saveToLocalStorage() {
  localStorage.setItem("listBaoHanh", JSON.stringify(listBaoHanh));
}

// ==================== ĐỔ DỮ LIỆU COMBOBOX ====================
function loadLoaiBaoHanh() {
  selectLoai.innerHTML = `<option value="">---Chọn loại bảo hành---</option>`;
  listLoaiBaoHanh.forEach((item) => {
    selectLoai.innerHTML += `<option value="${item.ten}">${item.ten}</option>`;
  });
}

function loadKhachHang() {
  selectKH.innerHTML = `<option value="">---Chọn khách hàng---</option>`;
  listKhachHang.forEach((item) => {
    selectKH.innerHTML += `<option value="${item.ten}">${item.ten}</option>`;
  });
}

// ==================== RENDER BẢNG ====================
function renderTable(data = listBaoHanh) {
  const rows = data.map(
    (item, index) => `
    <tr>
      <td>${item.ma}</td>
      <td>${item.loai}</td>
      <td>${item.mamay}</td>
      <td>${item.tenkh}</td>
      <td>${item.ngaybd}</td>
      <td>${item.ngaykt}</td>
      <td>
        <button class="sua" onclick="editItem(${index})">Chỉnh Sửa</button>
        <button class="xoa" onclick="deleteItem(${index})">Xóa</button>
      </td>
    </tr>
  `
  );

  table.innerHTML = `
    <tr>
      <th>Mã bảo hành</th>
      <th>Loại bảo hành</th>
      <th>Mã máy tính</th>
      <th>Khách hàng</th>
      <th>Ngày bắt đầu</th>
      <th>Ngày kết thúc</th>
      <th>Thao tác</th>
    </tr>
    ${rows.join("")}
  `;
}

// ==================== THÊM ====================
btnThem.addEventListener("click", () => {
  const ma = inputMa.value.trim();
  const loai = selectLoai.value;
  const mamay = inputMaMay.value.trim();
  const tenkh = selectKH.value;
  const ngaybd = inputNgayBD.value;
  const ngaykt = inputNgayKT.value;

  if (!ma || !loai || !mamay || !tenkh || !ngaybd || !ngaykt) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (listBaoHanh.some((item) => item.ma === ma)) {
    alert("Mã bảo hành đã tồn tại!");
    return;
  }

  listBaoHanh.push({ ma, loai, mamay, tenkh, ngaybd, ngaykt });
  saveToLocalStorage();
  renderTable();
  clearInput();
});

// ==================== CLEAR INPUT ====================
function clearInput() {
  inputMa.value = inputMaMay.value = inputNgayBD.value = inputNgayKT.value = "";

  selectLoai.value = "";
  selectKH.value = "";
}

// ==================== CHỈNH SỬA ====================
function editItem(index) {
  const item = listBaoHanh[index];
  inputMa.value = item.ma;
  selectLoai.value = item.loai;
  inputMaMay.value = item.mamay;
  selectKH.value = item.tenkh;
  inputNgayBD.value = item.ngaybd;
  inputNgayKT.value = item.ngaykt;
  editingIndex = index;
}

btnSua.addEventListener("click", () => {
  if (editingIndex === -1) {
    alert("Chưa chọn bảo hành để sửa!");
    return;
  }

  listBaoHanh[editingIndex] = {
    ma: inputMa.value.trim(),
    loai: selectLoai.value,
    mamay: inputMaMay.value.trim(),
    tenkh: selectKH.value,
    ngaybd: inputNgayBD.value,
    ngaykt: inputNgayKT.value,
  };

  saveToLocalStorage();
  editingIndex = -1;
  renderTable();
  clearInput();
});

// ==================== XÓA ====================
function deleteItem(index) {
  if (confirm("Bạn có chắc muốn xóa bảo hành này không?")) {
    listBaoHanh.splice(index, 1);
    saveToLocalStorage();
    renderTable();
  }
}

btnXoa.addEventListener("click", () => {
  const ma = inputMa.value.trim();
  if (!ma) {
    alert("Nhập mã bảo hành cần xóa!");
    return;
  }
  const index = listBaoHanh.findIndex((item) => item.ma === ma);
  if (index === -1) {
    alert("Không tìm thấy bảo hành!");
    return;
  }
  deleteItem(index);
  clearInput();
});

// ==================== TÌM KIẾM ====================
btnTim.addEventListener("click", () => {
  const keyword = inputTim.value.trim().toLowerCase();
  const result = listBaoHanh.filter(
    (item) =>
      item.ma.toLowerCase().includes(keyword) ||
      item.loai.toLowerCase().includes(keyword) ||
      item.tenkh.toLowerCase().includes(keyword)
  );
  renderTable(result);
});
renderTable();
loadLoaiBaoHanh();
loadKhachHang();
