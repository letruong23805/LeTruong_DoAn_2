// document.addEventListener("DOMContentLoaded", () => {
//   const nutDatHang = document.querySelectorAll(".dathang");
//   const inputTimKiem = document.querySelector(".timkiem input");
//   const btnTimKiem = document.querySelector(".timkiem i"); // nút tìm kiếm (icon kính lúp)

//   // Thêm sự kiện click cho nút "Đặt hàng"
//   nutDatHang.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const sanpham = event.target.closest(".sanpham");
//       const tensp = sanpham.querySelector(".tensp p").innerText;
//       const giasp = sanpham.querySelector(".giasp").innerText;
//       const anhsp = sanpham.querySelector(".anh img").src;

//       const sp = { ten: tensp, gia: giasp, anh: anhsp };

//       let giohang = JSON.parse(localStorage.getItem("giohang")) || [];
//       giohang.push(sp);
//       localStorage.setItem("giohang", JSON.stringify(giohang));

//       alert("Đã thêm sản phẩm vào giỏ hàng!");
//     });
//   });

//   // Tìm kiếm khi bấm nút
//   btnTimKiem.addEventListener("click", () => {
//     const keyword = inputTimKiem.value.trim().toLowerCase();
//     const sanPhamList = document.querySelectorAll(".sanpham");
//     let found = false;

//     sanPhamList.forEach((sp) => {
//       const tensp = sp.querySelector(".tensp p").innerText.toLowerCase();
//       if (tensp.includes(keyword)) {
//         sp.style.display = ""; // Hiển thị sản phẩm
//         if (!found) {
//           // Cuộn đến sản phẩm đầu tiên khớp
//           sp.scrollIntoView({ behavior: "smooth", block: "center" });
//           found = true;
//         }
//         // } else {
//         //   sp.style.display = "none"; // Ẩn sản phẩm không khớp
//       }
//     });

//     if (!found) {
//       alert("Không tìm thấy sản phẩm nào khớp!");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const nutDatHang = document.querySelectorAll(".dathang");
  const inputTimKiem = document.querySelector(".timkiem input");
  const btnTimKiem = document.querySelector(".timkiem i");

  nutDatHang.forEach((button) => {
    button.addEventListener("click", (event) => {
      const sanpham = event.target.closest(".sanpham");
      const tensp = sanpham.querySelector(".tensp p").innerText;
      const giasp = sanpham.querySelector(".giasp").innerText;
      const anhsp = sanpham.querySelector(".anh img").src;

      const sp = { ten: tensp, gia: giasp, anh: anhsp };

      let giohang = JSON.parse(localStorage.getItem("giohang")) || [];
      giohang.push(sp);
      localStorage.setItem("giohang", JSON.stringify(giohang));

      alert("Đã thêm sản phẩm vào giỏ hàng!");
    });
  });

  btnTimKiem.addEventListener("click", () => {
    const keyword = inputTimKiem.value.trim().toLowerCase();
    const sanPhamList = document.querySelectorAll(".sanpham");
    let found = false;
    sanPhamList.forEach((sp) => {
      const tensp = sp.querySelector(".tensp p").innerText.toLowerCase();
      if (tensp.includes(keyword)) {
        sp.style.display = "";
        if (!found) {
          sp.scrollIntoView({ behavior: "smooth", block: "center" });
          found = true;
        }
      }
    });

    if (!found) {
      alert("Không tìm thấy sản phẩm nào khớp!");
    }
  });

  // ==================== SLIDER ====================
  const slides = document.querySelectorAll(".slide img");
  const btnLeft = document.querySelector(".nutbam .left");
  const btnRight = document.querySelector(".nutbam .right");
  let index = 0;
  let autoSlide;

  // Ẩn tất cả ảnh
  function hideAll() {
    slides.forEach((img) => (img.style.display = "none"));
  }

  // Hiển thị ảnh hiện tại
  function showSlide(i) {
    hideAll();
    slides[i].style.display = "block";
  }

  // Chuyển ảnh tiếp theo
  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  // Chuyển ảnh trước
  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  // Tự động chạy 3 giây đổi ảnh
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }

  // Khi click vào nút thì dừng auto và đổi ảnh
  btnRight.addEventListener("click", () => {
    nextSlide();
    clearInterval(autoSlide);
    startAutoSlide();
  });

  btnLeft.addEventListener("click", () => {
    prevSlide();
    clearInterval(autoSlide);
    startAutoSlide();
  });

  // khởi tạo
  hideAll();
  showSlide(index);
  startAutoSlide();
});
