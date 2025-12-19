let listLoaiBaoHanh = JSON.parse(localStorage.getItem("listLoaiBaoHanh")) || [];
let editingIndex = -1;

const inputMa = document.querySelector(
  'input[placeholder="Nhập mã loại bảo hành"]'
);
const inputTen = document.querySelector(
  'input[placeholder="Nhập tên loại bảo hành"]'
);
const inputTim = document.querySelector(".timkiem input");

const btnThem = document.querySelector(".nut1");
const btnSua = document.querySelector(".nut2");
const btnXoa = document.querySelector(".nut3");
const btnTim = document.querySelector(".timkiem button");

const table = document.querySelector(".bang");

function saveToLocalStorage() {
  localStorage.setItem("listLoaiBaoHanh", JSON.stringify(listLoaiBaoHanh));
}

function renderTable(data = listLoaiBaoHanh) {
  const rows = data.map(
    (item, index) => `
      <tr>
        <td>${item.ma}</td>
        <td>${item.ten}</td>
        <td>
          <button class="sua" onclick="editItem(${index})">Chỉnh Sửa</button>
          <button class="xoa" onclick="deleteItem(${index})">Xóa</button>
        </td>
      </tr>
    `
  );
  table.innerHTML = `
      <tr>
        <th>Mã loại bảo hành</th>
        <th>Tên loại bảo hành</th>
        <th>Thao tác</th>
      </tr>
      ${rows.join("")}
    `;
}

btnThem.addEventListener("click", () => {
  const ma = inputMa.value.trim();
  const ten = inputTen.value.trim();

  if (!ma || !ten) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (listLoaiBaoHanh.some((item) => item.ma === ma)) {
    alert("Mã loại bảo hành đã tồn tại!");
    return;
  }

  listLoaiBaoHanh.push({ ma, ten });
  saveToLocalStorage();
  renderTable();
  inputMa.value = inputTen.value = "";
});

function editItem(index) {
  const item = listLoaiBaoHanh[index];
  inputMa.value = item.ma;
  inputTen.value = item.ten;
  editingIndex = index;
}

btnSua.addEventListener("click", () => {
  if (editingIndex === -1) {
    alert("Chưa chọn loại bảo hành để sửa!");
    return;
  }

  const ma = inputMa.value.trim();
  const ten = inputTen.value.trim();

  if (!ma || !ten) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  listLoaiBaoHanh[editingIndex] = { ma, ten };
  saveToLocalStorage();
  editingIndex = -1;
  renderTable();
  inputMa.value = inputTen.value = "";
});

function deleteItem(index) {
  if (confirm("Bạn có chắc muốn xóa không?")) {
    listLoaiBaoHanh.splice(index, 1);
    saveToLocalStorage();
    renderTable();
  }
}

btnXoa.addEventListener("click", () => {
  const ma = inputMa.value.trim();
  if (!ma) {
    alert("Vui lòng nhập mã loại bảo hành cần xóa!");
    return;
  }

  const index = listLoaiBaoHanh.findIndex((item) => item.ma === ma);
  if (index === -1) {
    alert("Không tìm thấy mã loại bảo hành!");
    return;
  }

  deleteItem(index);
  inputMa.value = inputTen.value = "";
});

btnTim.addEventListener("click", () => {
  const keyword = inputTim.value.trim().toLowerCase();
  const result = listLoaiBaoHanh.filter(
    (item) =>
      item.ma.toLowerCase().includes(keyword) ||
      item.ten.toLowerCase().includes(keyword)
  );
  renderTable(result);
});
renderTable();
