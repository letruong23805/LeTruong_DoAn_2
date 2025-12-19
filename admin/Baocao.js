let danhSachSP = JSON.parse(localStorage.getItem("maytinh")) || [];
let danhSachHD = JSON.parse(localStorage.getItem("hoadonban")) || [];
let thongKeBan = {};

danhSachHD.forEach((hd) => {
  if (!hd.chiTiet) return;
  hd.chiTiet.forEach((ct) => {
    if (!thongKeBan[ct.ma]) thongKeBan[ct.ma] = 0;
    thongKeBan[ct.ma] += Number(ct.soluong);
  });
});

let topSP = Object.entries(thongKeBan)
  .map(([ma, sl]) => ({ ma, sl }))
  .sort((a, b) => b.sl - a.sl)
  .slice(0, 3);

let table = document.querySelector(".spbanchay table");

let html = `
<tr>
  <th>Mã máy tính</th>
  <th>Tên máy Tính</th>
  <th>Loại máy tính</th>
  <th>Nhà cung cấp</th>
  <th>Hình ảnh</th>
  <th>Số lượng bán</th>
  <th>Giá bán</th>
</tr>
`;

topSP.forEach((spTop) => {
  let sp = danhSachSP.find((x) => x.ma === spTop.ma);
  if (sp) {
    html += `
      <tr>
        <td>${sp.ma}</td>
        <td>${sp.ten}</td>
        <td>${sp.loai}</td>
        <td>${sp.ncc}</td>
        <td><img src="${sp.anh}" width="60"></td>
        <td>${spTop.sl}</td>
        <td>${sp.gia}</td>
      </tr>
    `;
  }
});

table.innerHTML = html;

let tongTon = danhSachSP.reduce((sum, sp) => sum + Number(sp.soluong), 0);

document.querySelector(
  ".mau1"
).innerHTML = `<h2>Số lượng máy tính tồn kho: <span style="color:white">${tongTon}</span></h2>`;

let doanhThuTheoThang = Array(12).fill(0);

danhSachHD.forEach((hd) => {
  if (!hd.ngay) return;

  let date = new Date(hd.ngay);
  if (isNaN(date)) return;

  let thang = date.getMonth(); // 0 - 11
  doanhThuTheoThang[thang] += Number(hd.tong) || 0;
});

for (let i = 1; i <= 12; i++) {
  let thanh = document.querySelector(".th" + i);

  if (!thanh) continue;

  let value = doanhThuTheoThang[i - 1];

  let chieuCao = value > 0 ? value / 2000000 : 5;

  thanh.style.height = chieuCao + "px";

  thanh.title = value.toLocaleString("vi-VN") + " VNĐ";
}
