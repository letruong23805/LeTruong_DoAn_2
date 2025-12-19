document.addEventListener("DOMContentLoaded", () => {
  // ====================== KHỞI TẠO DỮ LIỆU ======================
  let danhSachSP = JSON.parse(localStorage.getItem("maytinh")) || [];
  let danhSachNV = JSON.parse(localStorage.getItem("nhanvien")) || [];
  let danhSachNCC = JSON.parse(localStorage.getItem("nhacungcap")) || [];
  let danhSachHD = JSON.parse(localStorage.getItem("hoadonnhap")) || [];

  let dsSPChon = [];
  let indexDangSuaHD = -1;

  // ====================== LẤY PHẦN TỬ HTML ======================
  const inputMaHD = document.querySelector(
    'input[placeholder="Nhập mã hóa đơn"]'
  );
  const selectNV = document.getElementById("nv");
  const selectNCC = document.getElementById("ncc");
  const inputNgay = document.querySelector('input[type="date"]');
  const tableSP = document.getElementById("themsp");
  const inputTongTien = document.getElementById("tongTien");

  const btnThemHD = document.querySelector(".nut1");
  const btnSuaHD = document.querySelector(".nut2");
  const btnXoaHD = document.querySelector(".nut3");
  const btnThemSP = document.querySelector(".nut4");

  const tableHD = document.getElementById("bangHD");
  const inputTim = document.querySelector(".danhsach .timkiem input");
  const btnTim = document.querySelector(".danhsach .timkiem button");

  // ====================== LOAD NHÂN VIÊN & NCC ======================
  function loadSelectNV() {
    selectNV.innerHTML = `<option value="">---Chọn nhân viên---</option>`;
    danhSachNV.forEach((nv) => {
      selectNV.innerHTML += `<option value="${nv.ma}">${nv.ten}</option>`;
    });
  }

  function loadSelectNCC() {
    selectNCC.innerHTML = `<option value="">---Chọn nhà cung cấp---</option>`;
    danhSachNCC.forEach((ncc) => {
      selectNCC.innerHTML += `<option value="${ncc.ma}">${ncc.ten}</option>`;
    });
  }

  // ====================== THÊM SẢN PHẨM VÀO HÓA ĐƠN ======================
  btnThemSP.addEventListener("click", () => {
    if (danhSachSP.length === 0) return alert("Chưa có sản phẩm nào!");

    let html = `
      <tr>
        <th>Mã</th><th>Tên</th><th>Tồn kho</th><th>Giá</th><th>Chọn</th>
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
    tableSP.innerHTML = html;
  });

  window.themSPVaoHD = function (i) {
    let sp = danhSachSP[i];
    let sl = Number(prompt(`Nhập số lượng cho ${sp.ten}`, 1));

    // Bỏ điều kiện số lượng không được lớn hơn tồn
    if (isNaN(sl) || sl <= 0) return alert("Số lượng không hợp lệ!");

    let exist = dsSPChon.find((item) => item.ma === sp.ma);
    if (exist) {
      exist.soluongChon += sl;
    } else {
      dsSPChon.push({ ...sp, soluongChon: sl });
    }
    loadTableSP();
    tinhTongTien();
  };

  window.xoaSPTrongHD = function (i) {
    dsSPChon.splice(i, 1);
    loadTableSP();
    tinhTongTien();
  };

  function loadTableSP() {
    let html = `
      <tr>
        <th>Mã</th><th>Tên</th><th>Số lượng nhập</th><th>Giá</th><th>Xóa</th>
      </tr>
    `;
    dsSPChon.forEach((sp, i) => {
      html += `
        <tr>
          <td>${sp.ma}</td>
          <td>${sp.ten}</td>
          <td>${sp.soluongChon}</td>
          <td>${sp.gia}</td>
          <td><button onclick="xoaSPTrongHD(${i})">Xóa</button></td>
        </tr>
      `;
    });
    tableSP.innerHTML = html;
  }

  function tinhTongTien() {
    inputTongTien.value = dsSPChon.reduce(
      (sum, sp) => sum + sp.soluongChon * sp.gia,
      0
    );
  }

  // ====================== THÊM HÓA ĐƠN NHẬP (CỘNG TỒN KHO) ======================
  btnThemHD.addEventListener("click", () => {
    if (
      !inputMaHD.value ||
      !selectNV.value ||
      !selectNCC.value ||
      !inputNgay.value ||
      dsSPChon.length === 0
    )
      return alert("Nhập đầy đủ thông tin!");

    if (danhSachHD.some((hd) => hd.maHD === inputMaHD.value))
      return alert("Mã hóa đơn đã tồn tại!");

    let hd = {
      maHD: inputMaHD.value,
      nv: selectNV.value,
      ncc: selectNCC.value,
      ngay: inputNgay.value,
      dsSP: [...dsSPChon],
      tongTien: inputTongTien.value,
    };

    danhSachHD.push(hd);
    localStorage.setItem("hoadonnhap", JSON.stringify(danhSachHD));

    // CỘNG SỐ LƯỢNG NHẬP VÀO TỒN KHO
    dsSPChon.forEach((spHD) => {
      let spKho = danhSachSP.find((sp) => sp.ma === spHD.ma);
      if (spKho) {
        spKho.soluong = Number(spKho.soluong) + Number(spHD.soluongChon);
      }
    });
    localStorage.setItem("maytinh", JSON.stringify(danhSachSP));

    clearFormHD();
    loadTableHD();
    alert("Thêm hóa đơn thành công!");
  });

  // ====================== SỬA, XÓA HÓA ĐƠN ======================
  btnSuaHD.addEventListener("click", () => {
    if (indexDangSuaHD === -1) return alert("Chọn hóa đơn cần sửa!");

    danhSachHD[indexDangSuaHD] = {
      maHD: inputMaHD.value,
      nv: selectNV.value,
      ncc: selectNCC.value,
      ngay: inputNgay.value,
      dsSP: [...dsSPChon],
      tongTien: inputTongTien.value,
    };
    localStorage.setItem("hoadonnhap", JSON.stringify(danhSachHD));
    clearFormHD();
    loadTableHD();
    indexDangSuaHD = -1;
    alert("Cập nhật thành công!");
  });

  btnXoaHD.addEventListener("click", () => {
    const ma = inputMaHD.value.trim();
    if (!ma) return alert("Nhập mã cần xóa!");

    const index = danhSachHD.findIndex((hd) => hd.maHD === ma);
    if (index === -1) return alert("Không tìm thấy hóa đơn!");

    if (!confirm("Xóa hóa đơn này?")) return;

    danhSachHD.splice(index, 1);
    localStorage.setItem("hoadonnhap", JSON.stringify(danhSachHD));
    clearFormHD();
    loadTableHD();
  });

  window.xemHD = function (i) {
    let hd = danhSachHD[i];
    inputMaHD.value = hd.maHD;
    selectNV.value = hd.nv;
    selectNCC.value = hd.ncc;
    inputNgay.value = hd.ngay;
    dsSPChon = [...hd.dsSP];
    loadTableSP();
    tinhTongTien();
    indexDangSuaHD = i;
  };

  window.suaHD = function (i) {
    let hd = danhSachHD[i];
    xemHD(i);
  };

  window.xoaHD = function (i) {
    if (!confirm("Bạn có chắc muốn xóa hóa đơn này?")) return;
    danhSachHD.splice(i, 1);
    localStorage.setItem("hoadonnhap", JSON.stringify(danhSachHD));
    loadTableHD();
  };

  // ====================== TÌM KIẾM ======================
  btnTim.addEventListener("click", () => {
    let keyword = inputTim.value.trim().toLowerCase();
    let ds = danhSachHD.filter((hd) => {
      let ncc = danhSachNCC.find((n) => n.ma === hd.ncc)?.ten || "";
      return (
        hd.maHD.toLowerCase().includes(keyword) ||
        ncc.toLowerCase().includes(keyword)
      );
    });
    loadTableHD(ds);
  });

  // ====================== HỖ TRỢ ======================
  function clearFormHD() {
    inputMaHD.value = "";
    selectNV.value = "";
    selectNCC.value = "";
    inputNgay.value = "";
    dsSPChon = [];
    loadTableSP();
    inputTongTien.value = "";
    indexDangSuaHD = -1;
  }

  function loadTableHD(ds = danhSachHD) {
    // CHỈ GIỮ LẠI DÒNG HEADER
    while (tableHD.rows.length > 1) {
      tableHD.deleteRow(1);
    }

    ds.forEach((hd, i) => {
      let row = tableHD.insertRow(-1);

      row.insertCell(0).innerText = hd.maHD;
      row.insertCell(1).innerText =
        danhSachNCC.find((n) => n.ma === hd.ncc)?.ten || "";
      row.insertCell(2).innerText =
        danhSachNV.find((n) => n.ma === hd.nv)?.ten || "";
      row.insertCell(3).innerText = hd.ngay;
      row.insertCell(4).innerText = hd.tongTien;

      row.insertCell(5).innerHTML = `
      <button onclick="xemHD(${i})">Xem</button>
      <button onclick="suaHD(${i})">Sửa</button>
      <button onclick="xoaHD(${i})">Xóa</button>
    `;
    });
  }

  loadSelectNV();
  loadSelectNCC();
  loadTableHD();
});
