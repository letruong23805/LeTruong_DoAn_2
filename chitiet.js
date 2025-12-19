const sanpham = [
  {
    id: 1,
    name: "[New] Lecoo Fighter 7000 2025",
    brand: "Lenovo",
    price: "29.490.000đ",
    status: "Còn hàng",
    img: "./img/anhmt.png",
    mota: [
      " CPU 14th Generation Intel® Core i7-14650HX, 16C / 24T, P-core up to 5.2GHz, 30MB Cache RAM 16GB DDR5 5600MHz",
      "Ổ cứng 1TB PCIe NVMe M.2 SSD Gen 4",
      "Card VGA NVIDIA Geforce RTX 5060 8GB GDDR7",
      "Màn hình 16-inch, 2.5K (2560 x 1600) IPS, 16:10, 180Hz, 1ms, 100% DCI-P3, 500 nits, HDR, Adaptive-Sync",
      "Webcam HD Webcam",
      "Pin 4-cell, 80Wh",
    ],
  },
  {
    id: 2,
    name: "[New 100%]HP Victus 15",
    brand: "HP",
    price: "17.800.000đ",
    status: "Còn hàng",
    img: "./img/anh1.png",
    mota: [
      " CPU 14th Generation Intel® Core i7-14650HX, 16C / 24T, P-core up to 5.2GHz, 30MB Cache RAM 16GB DDR5 5600MHz",
      "Ổ cứng 1TB PCIe NVMe M.2 SSD Gen 4",
      "Card VGA NVIDIA Geforce RTX 5060 8GB GDDR7",
      "Màn hình 16-inch, 2.5K (2560 x 1600) IPS, 16:10, 180Hz, 1ms, 100% DCI-P3, 500 nits, HDR, Adaptive-Sync",
      "Webcam HD Webcam",
      "Pin 4-cell, 80Wh",
    ],
  },
  {
    id: 3,
    name: "[New 100%] Lenovo Legion R7000 2025",
    brand: "Lenovo ",
    price: "31.890.000đ",
    status: "Còn hàng",
    img: "./img/anh2.png",
    mota: [
      "CPU AMD Ryzen 7 H 255 (8 nhân 16 luồng, xung nhịp cơ bản 3.8GHz có thể đạt tới 4.9GHz đơn nhân với turbo boost, 8MB L2 Cache, 16MB L3 Cache, default TDP 45W)",
      "RAM 16GB DDR5 5600MHz (có thể nâng cấp)",
      "Ổ cứng 512GB PCIe® NVMe™ M.2 SSD Gen 4",
      "Card VGA NVIDIA® GeForce® RTX 5060 8GB",
      "Màn hình 15.3 2.5K (2560x1600) IPS, không cảm ứng, độ sáng 400nits, độ phủ màu 100% sRGB, tần số quét 180Hz, độ phản hồi 3ms, FreeSync premium, NVIDIA® G-SYNC®, DC dimmer",
      "Pin 4-cell, 60wh",
    ],
  },
  {
    id: 4,
    name: "[New]Lenovo LOQ Essential",
    brand: "Lenovo ",
    price: "22.990.000",
    status: "Còn hàng",
    img: "./img/anh3.png",
    mota: [
      "CPU AMD Ryzen 7 H 255 (8 nhân 16 luồng, xung nhịp cơ bản 3.8GHz có thể đạt tới 4.9GHz đơn nhân với turbo boost, 8MB L2 Cache, 16MB L3 Cache, default TDP 45W)",
      "RAM 16GB DDR5 5600MHz (có thể nâng cấp)",
      "Ổ cứng 512GB PCIe® NVMe™ M.2 SSD Gen 4",
      "Card VGA NVIDIA® GeForce® RTX 5060 8GB",
      "Màn hình 15.3 2.5K (2560x1600) IPS, không cảm ứng, độ sáng 400nits, độ phủ màu 100% sRGB, tần số quét 180Hz, độ phản hồi 3ms, FreeSync premium, NVIDIA® G-SYNC®, DC dimmer",
      "Pin 4-cell, 60wh",
    ],
  },
  {
    id: 5,
    name: "[New 100%] Lenovo Legion Y7000 2024",
    brand: "Lenovo ",
    price: "27.290.000",
    status: "Còn hàng",
    img: "./img/anh4.png",
    mota: [
      "CPU 13th Generation Intel® Core i7-13650HX, 20C (6P + 8E) xung nhịp turbo đơn nhân tối đa 4,9GHz",
      "RAM 24 GB DDR5 (2x 12GB)",
      "Ổ cứng 512GB PCIe NVMe M.2 SSD Gen 4",
      "Card VGA NVIDIA Geforce RTX 4060 8GB GDDR6",
      "Màn hình 15.6 FHD (1920x1080) IPS, non-touch, 300nits, 144Hz,",
      "Pin 60whr, Super Rapid Charge",
    ],
  },
  {
    id: 6,
    name: "[New] Dell Inspiron 14 5445 2024",
    brand: "Dell ",
    price: "15.890.000",
    status: "Còn hàng",
    img: "./img/anh5.png",
    mota: [
      "CPU 13th Generation Intel® Core i7-13650HX, 20C (6P + 8E) xung nhịp turbo đơn nhân tối đa 4,9GHz",
      "RAM 24 GB DDR5 (2x 12GB)",
      "Ổ cứng 512GB PCIe NVMe M.2 SSD Gen 4",
      "Card VGA NVIDIA Geforce RTX 4060 8GB GDDR6",
      "Màn hình 15.6 FHD (1920x1080) IPS, non-touch, 300nits, 144Hz,",
      "Pin 60whr, Super Rapid Charge",
    ],
  },
  {
    id: 7,
    name: "[Outlet] Acer Nitro 5 Tiger Core i7 12650H, 16GB, 1 TB, RTX4050 6GB, 15.6 FHD IPS 144Hz",
    brand: "ACER ",
    price: "15.890.000",
    status: "Còn hàng",
    img: "./img/anh6.webp",
    mota: [
      "CPU 12th Generation Intel® Core i7-12650H, 20C (6P + 8E) xung nhịp turbo đơn nhân tối đa 4,9GHz",
      "RAM 24 GB DDR5 (2x 12GB)",
      "Ổ cứng 512GB PCIe NVMe M.2 SSD Gen 4",
      "Card VGA NVIDIA Geforce RTX 4050 6GB GDDR6",
      "Màn hình 15.6 FHD (1920x1080) IPS, non-touch, 300nits, 144Hz,",
      "Pin 60whr, Super Rapid Charge",
    ],
  },
  {
    id: 8,
    name: "[New] Lenovo Legion Y7000P Core i9 14900HX RAM 16GB SSD 1TB RTX 5060 8GB MÀN 16inch 2K+ 240Hz",
    brand: "ACER ",
    price: "15.890.000",
    status: "Còn hàng",
    img: "./img/anh7.webp",
    mota: [
      "CPU 12th Generation Intel® Core i9 14900HX, 20C (6P + 8E) xung nhịp turbo đơn nhân tối đa 4,9GHz",
      "RAM 16GB DDR5 (2x 12GB)",
      "Ổ cứng 1TB PCIe NVMe M.2 SSD Gen 4",
      "Card VGA NVIDIA Geforce RTX 5060 8GB",
      "MÀN 16inch 2K+ 240Hz, non-touch, 300nits, 144Hz,",
      "Pin 90whr, Super Rapid Charge",
    ],
  },
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const sp = sanpham.find((x) => x.id === id);

if (sp) {
  document.getElementById("anhsp").src = sp.img;
  document.getElementById("tensp").innerText = sp.name;
  document.getElementById("thuonghieu").innerText = "Thương hiệu: " + sp.brand;
  document.getElementById("giasp").innerText = sp.price;
  document.getElementById("trangthai").innerText = "Tình trạng: " + sp.status;

  let motaHTML = "";
  sp.mota.forEach((m) => {
    motaHTML += `<p>${m}</p>`;
  });
  document.getElementById("motasp").innerHTML = motaHTML;
}
