let danhSach = JSON.parse(localStorage.getItem("maytinh")) || [];
let indexDangSua = -1;

const inputMa = document.getElementById("ma");
const inputTen = document.getElementById("ten");
const selectLoai = document.getElementById("loai");
const selectNCC = document.getElementById("ncc");
const inputSoLuong = document.getElementById("soluong");
const inputGia = document.getElementById("gia");
const inputDuongDan = document.getElementById("duongdan");
const inputFile = document.getElementById("chonfile");
const preview = document.getElementById("preview");

const btnThem = document.querySelector(".nut1");
const btnSua = document.querySelector(".nut2");
const btnXoa = document.querySelector(".nut3");

const oTim = document.querySelector(".timkiem input");
const btnTim = document.querySelector(".timkiem button");

const table = document.querySelector(".bang");

function toBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function loadLoaiVaNCC() {
  let dsLoai = JSON.parse(localStorage.getItem("loaisanpham")) || [];
  let dsNCC = JSON.parse(localStorage.getItem("nhacungcap")) || [];

  // Loại sản phẩm
  selectLoai.innerHTML = `<option value="">---Chọn loại máy tính---</option>`;
  dsLoai.forEach((l) => {
    selectLoai.innerHTML += `<option value="${l.ten}">${l.ten}</option>`;
  });

  // Nhà cung cấp
  selectNCC.innerHTML = `<option value="">---Chọn nhà cung cấp---</option>`;
  dsNCC.forEach((n) => {
    selectNCC.innerHTML += `<option value="${n.ten}">${n.ten}</option>`;
  });
}

function loadTable(ds = danhSach) {
  table.innerHTML = `
    <tr>
        <th>Mã</th>
        <th>Tên máy tính</th>
        <th>Loại</th>
        <th>Nhà cung cấp</th>
        <th>Hình</th>
        <th>Số lượng</th>
        <th>Giá</th>
        <th>Thao tác</th>
    </tr>
  `;

  ds.forEach((sp, i) => {
    table.innerHTML += `
      <tr>
        <td>${sp.ma}</td>
        <td>${sp.ten}</td>
        <td>${sp.loai}</td>
        <td>${sp.ncc}</td>
        <td><img src="${sp.anh}" width="60"></td>
        <td>${sp.soluong}</td>
        <td>${sp.gia}</td>
        <td>
            <button class="sua" onclick="chinhSua(${i})">Sửa</button>
            <button class="xoa" data-index="${i}">Xóa</button>
        </td>
      </tr>
    `;
  });
}

btnThem.addEventListener("click", () => {
  if (
    !inputMa.value ||
    !inputTen.value ||
    !selectLoai.value ||
    !selectNCC.value ||
    !inputSoLuong.value ||
    !inputGia.value
  ) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (danhSach.some((sp) => sp.ma === inputMa.value)) {
    alert("Mã sản phẩm đã tồn tại!");
    return;
  }

  if (inputSoLuong.value <= 0 || inputGia.value <= 0) {
    alert("Số lượng và giá phải lớn hơn 0!");
    return;
  }

  if (inputFile.files.length > 0) {
    toBase64(inputFile.files[0], (base64) => themSP(base64));
  } else {
    themSP("");
  }
});

function themSP(anhBase64) {
  let sp = {
    ma: inputMa.value,
    ten: inputTen.value,
    loai: selectLoai.value,
    ncc: selectNCC.value,
    anh: anhBase64,
    soluong: inputSoLuong.value,
    gia: inputGia.value,
  };

  danhSach.push(sp);
  localStorage.setItem("maytinh", JSON.stringify(danhSach));

  loadTable();
  clearForm();
  alert("Thêm thành công!");
}

window.chinhSua = function (i) {
  let sp = danhSach[i];
  indexDangSua = i;

  inputMa.value = sp.ma;
  inputTen.value = sp.ten;
  selectLoai.value = sp.loai;
  selectNCC.value = sp.ncc;
  inputSoLuong.value = sp.soluong;
  inputGia.value = sp.gia;
  preview.src = sp.anh;
};

btnSua.addEventListener("click", () => {
  if (indexDangSua === -1) {
    alert("Chọn sản phẩm cần sửa!");
    return;
  }

  if (inputFile.files.length > 0) {
    toBase64(inputFile.files[0], (base64) => capNhatSP(base64));
  } else {
    capNhatSP(danhSach[indexDangSua].anh);
  }
});

function capNhatSP(anhBase64) {
  danhSach[indexDangSua] = {
    ma: inputMa.value,
    ten: inputTen.value,
    loai: selectLoai.value,
    ncc: selectNCC.value,
    anh: anhBase64,
    soluong: inputSoLuong.value,
    gia: inputGia.value,
  };

  localStorage.setItem("maytinh", JSON.stringify(danhSach));
  loadTable();
  clearForm();
  indexDangSua = -1;

  alert("Cập nhật thành công!");
}

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("xoa")) {
    let i = Number(e.target.dataset.index);
    xoaSP(i);
  }
});

function xoaSP(i) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    danhSach.splice(i, 1);
    localStorage.setItem("maytinh", JSON.stringify(danhSach));
    loadTable();
  }
}

btnXoa.addEventListener("click", () => {
  if (indexDangSua === -1) {
    alert("Chọn sản phẩm trước!");
    return;
  }

  if (confirm("Xóa sản phẩm này?")) {
    danhSach.splice(indexDangSua, 1);
    localStorage.setItem("maytinh", JSON.stringify(danhSach));

    loadTable();
    clearForm();
    indexDangSua = -1;
  }
});

btnTim.addEventListener("click", () => {
  let keyword = oTim.value.toLowerCase().trim();

  let ds = danhSach.filter(
    (sp) =>
      sp.ma.toLowerCase().includes(keyword) ||
      sp.ten.toLowerCase().includes(keyword)
  );

  loadTable(ds);
});

function clearForm() {
  inputMa.value = "";
  inputTen.value = "";
  inputSoLuong.value = "";
  inputGia.value = "";
  selectLoai.value = "";
  selectNCC.value = "";
  inputDuongDan.value = "";
  inputFile.value = "";
  preview.src = "";
}

document.getElementById("btnChonAnh").addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  let file = this.files[0];
  if (file) {
    inputDuongDan.value = file.name;
    preview.src = URL.createObjectURL(file);
  }
});

loadLoaiVaNCC();
loadTable();
