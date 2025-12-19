let danhSachSP = JSON.parse(localStorage.getItem("maytinh")) || [];
let danhSachNV = JSON.parse(localStorage.getItem("nhanvien")) || [];
let danhSachKH = JSON.parse(localStorage.getItem("listKhachHang")) || [];
let danhSachHD = JSON.parse(localStorage.getItem("hoadonban")) || [];

let indexDangSuaHD = -1;
let chiTietHD = [];

const inputMaHD = document.querySelector(
  'input[placeholder="Nhập mã hóa đơn"]'
);
const selectNV = document.getElementById("nv");
const selectKH = document.getElementById("kh");
const inputNgay = document.querySelector('input[type="date"]');
const inputDiaChi = document.querySelector('input[placeholder="Nhập địa chỉ"]');
const inputTongTien = document.getElementById("tongTien");

const btnThemHD = document.querySelector(".nut1");
const btnSuaHD = document.querySelector(".nut2");
const btnXoaHD = document.querySelector(".nut3");
const btnThemMayTinh = document.querySelector(".nut4");

const tableChiTiet = document.getElementById("themsp");
const tableHD = document.querySelector(".danhsach .bang");

const oTimHD = document.querySelector(".danhsach .timkiem input");
const btnTimHD = document.querySelector(".danhsach .timkiem button");

function loadSelectNV() {
  selectNV.innerHTML = `<option value="">---Chọn nhân viên---</option>`;
  danhSachNV.forEach((nv) => {
    selectNV.innerHTML += `<option value="${nv.ten}">${nv.ten}</option>`;
  });
}

function loadSelectKH() {
  selectKH.innerHTML = `<option value="">---Chọn khách hàng---</option>`;
  danhSachKH.forEach((kh) => {
    selectKH.innerHTML += `<option value="${kh.ten}">${kh.ten}</option>`;
  });
}

// ------------------- THÊM SẢN PHẨM -------------------
btnThemMayTinh.addEventListener("click", () => {
  if (danhSachSP.length === 0) {
    alert("Chưa có sản phẩm nào!");
    return;
  }

  let html = `
    <tr>
      <th>Mã sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Đơn giá</th>
      <th>Thao tác</th>
    </tr>
  `;

  danhSachSP.forEach((sp, i) => {
    html += `
      <tr>
        <td>${sp.ma}</td>
        <td>${sp.ten}</td>
        <td>${sp.soluong}</td>
        <td>${sp.gia}</td>
        <td><button onclick="themSPVaoHD(${i})">Thêm</button></td>
      </tr>
    `;
  });

  tableChiTiet.innerHTML = html;
});

window.themSPVaoHD = function (i) {
  let sp = danhSachSP[i];
  let soLuong = Number(prompt(`Nhập số lượng cho ${sp.ten}`, 1));

  if (isNaN(soLuong) || soLuong <= 0) return alert("Số lượng không hợp lệ!");

  let exist = chiTietHD.find((item) => item.ma === sp.ma);

  if (exist) {
    exist.soluong += soLuong;
  } else {
    chiTietHD.push({
      ma: sp.ma,
      ten: sp.ten,
      soluong: soLuong,
      gia: sp.gia,
    });
  }

  loadTableChiTiet();
  tinhTongTien();
};

function loadTableChiTiet() {
  let html = `
    <tr>
      <th>Mã sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Đơn giá</th>
      <th>Thao tác</th>
    </tr>
  `;

  chiTietHD.forEach((sp, i) => {
    html += `
      <tr>
        <td>${sp.ma}</td>
        <td>${sp.ten}</td>
        <td>${sp.soluong}</td>
        <td>${sp.gia}</td>
        <td><button onclick="xoaSPChiTiet(${i})">Xóa</button></td>
      </tr>
    `;
  });

  tableChiTiet.innerHTML = html;
}

window.xoaSPChiTiet = function (i) {
  chiTietHD.splice(i, 1);
  loadTableChiTiet();
  tinhTongTien();
};

function tinhTongTien() {
  inputTongTien.value = chiTietHD.reduce(
    (sum, sp) => sum + sp.soluong * sp.gia,
    0
  );
}

// ------------------- THÊM HÓA ĐƠN -------------------
btnThemHD.addEventListener("click", () => {
  if (
    !inputMaHD.value ||
    !selectNV.value ||
    !selectKH.value ||
    chiTietHD.length === 0
  ) {
    alert("Vui lòng nhập đủ thông tin!");
    return;
  }

  let hd = {
    maHD: inputMaHD.value,
    nv: selectNV.value,
    kh: selectKH.value,
    ngay: inputNgay.value,
    diachi: inputDiaChi.value,
    tong: inputTongTien.value,
    chiTiet: [...chiTietHD],
  };

  danhSachHD.push(hd);
  localStorage.setItem("hoadonban", JSON.stringify(danhSachHD));

  loadTableHD();
  clearFormHD();
  alert("Thêm hóa đơn thành công!");
});

// ------------------- HIỂN THỊ DANH SÁCH HÓA ĐƠN -------------------
function loadTableHD(ds = danhSachHD) {
  let html = `
    <tr>
      <th>Mã hóa đơn</th>
      <th>Tên nhân viên</th>
      <th>Tên khách hàng</th>
      <th>Ngày lập</th>
      <th>Địa chỉ nhận hàng</th>
      <th>Tổng tiền</th>
      <th>Thao tác</th>
    </tr>
  `;

  ds.forEach((hd, i) => {
    html += `
      <tr>
        <td>${hd.maHD}</td>
        <td>${hd.nv}</td>
        <td>${hd.kh}</td>
        <td>${hd.ngay}</td>
        <td>${hd.diachi}</td>
        <td>${hd.tong}</td>
        <td>
          <button onclick="suaHD(${i})">Sửa</button>
          <button onclick="xoaHD(${i})">Xóa</button>
          <button onclick="xemChiTiet(${i})">Xem</button>
        </td>
      </tr>
    `;
  });

  tableHD.innerHTML = html;
}

// ------------------- XEM HÓA ĐƠN (ĐỔ DỮ LIỆU SANG FORM) -------------------
window.xemChiTiet = function (i) {
  let hd = danhSachHD[i];
  indexDangSuaHD = i;

  inputMaHD.value = hd.maHD;
  selectNV.value = hd.nv;
  selectKH.value = hd.kh;
  inputNgay.value = hd.ngay;
  inputDiaChi.value = hd.diachi;

  chiTietHD = [...hd.chiTiet];
  loadTableChiTiet();
  tinhTongTien();
};

// ------------------- SỬA HÓA ĐƠN -------------------
window.suaHD = function (i) {
  xemChiTiet(i);
};

btnSuaHD.addEventListener("click", () => {
  if (indexDangSuaHD === -1) {
    alert("Chưa chọn hóa đơn!");
    return;
  }

  danhSachHD[indexDangSuaHD] = {
    maHD: inputMaHD.value,
    nv: selectNV.value,
    kh: selectKH.value,
    ngay: inputNgay.value,
    diachi: inputDiaChi.value,
    tong: inputTongTien.value,
    chiTiet: [...chiTietHD],
  };

  localStorage.setItem("hoadonban", JSON.stringify(danhSachHD));
  loadTableHD();
  clearFormHD();
  indexDangSuaHD = -1;
  alert("Sửa hóa đơn thành công!");
});

// ------------------- XÓA HÓA ĐƠN -------------------
window.xoaHD = function (i) {
  if (!confirm("Bạn có chắc muốn xóa hóa đơn?")) return;
  danhSachHD.splice(i, 1);
  localStorage.setItem("hoadonban", JSON.stringify(danhSachHD));
  loadTableHD();
};

btnXoaHD.addEventListener("click", () => {
  if (indexDangSuaHD === -1) {
    alert("Vui lòng chọn hóa đơn trong bảng để xóa!");
    return;
  }

  if (!confirm("Bạn có chắc muốn xóa hóa đơn này?")) return;

  danhSachHD.splice(indexDangSuaHD, 1);
  localStorage.setItem("hoadonban", JSON.stringify(danhSachHD));

  loadTableHD();
  clearFormHD();
  chiTietHD = [];
  loadTableChiTiet();
  indexDangSuaHD = -1;
});

// ------------------- TÌM KIẾM -------------------
btnTimHD.addEventListener("click", () => {
  let keyword = oTimHD.value.trim().toLowerCase();

  let ds = danhSachHD.filter(
    (hd) =>
      hd.maHD.toLowerCase().includes(keyword) ||
      hd.nv.toLowerCase().includes(keyword)
  );

  loadTableHD(ds);
});

// ------------------- RESET FORM -------------------
function clearFormHD() {
  inputMaHD.value = "";
  selectNV.value = "";
  selectKH.value = "";
  inputNgay.value = "";
  inputDiaChi.value = "";
  chiTietHD = [];
  loadTableChiTiet();
  inputTongTien.value = "";
}

loadSelectNV();
loadSelectKH();
loadTableHD();
loadTableChiTiet();
