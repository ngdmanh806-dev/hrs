// ================== CẤU TRÚC DỮ LIỆU ==================

function bookRoom(id) {
  const room = rooms.find((r) => r.id === id);
  if (!room) return showMessage("Không tìm thấy phòng!", "error");
  if (!room.available) return showMessage("Phòng đã được đặt!", "error");

  const name = prompt("Nhập tên khách hàng:");
  if (!name) return;
  const phone = prompt("Nhập số điện thoại:");
  if (!/^\d{8,12}$/.test(phone))
    return showMessage("Số điện thoại không hợp lệ!", "error");

  const method = prompt("Phương thức thanh toán (Tiền mặt/Thẻ/Chuyển khoản):");
  if (!method) return;

  room.available = false;
  saveData();
  renderRooms();
  showMessage(`Đặt phòng ${id} thành công cho ${name}!`, "success");
}

function cancelRoom(id) {
  const room = rooms.find((r) => r.id === id);
  if (!room) return showMessage("Không tìm thấy phòng!", "error");
  room.available = true;
  saveData();
  renderRooms();
  showMessage(`Phòng ${id} đã được hủy đặt!`, "success");
}

// ================== XUẤT FILE CSV ==================
function exportCSV() {
  if (rooms.length === 0)
    return showMessage("Không có dữ liệu để xuất!", "error");
  const header = ["ID", "Loại", "Giá", "Tình trạng"];
  const rows = rooms.map((r) => [
    r.id,
    r.type,
    r.price,
    r.available ? "Còn trống" : "Đã đặt",
  ]);
  const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rooms.csv";
  a.click();
}

// ================== ĐĂNG NHẬP NHÂN VIÊN ==================
function employeeLogin() {
  const pass = prompt("Nhập mật khẩu nhân viên:");
  if (pass === employeePassword) {
    document.getElementById("employeePanel").style.display = "block";
    showMessage("Đăng nhập thành công!", "success");
  } else {
    showMessage("Sai mật khẩu!", "error");
  }
}

// ================== KHỞI TẠO ==================
document.addEventListener("DOMContentLoaded", () => {
  renderRooms();
  const form = document.getElementById("addRoomForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const type = document.getElementById("roomType").value;
      const price = document.getElementById("roomPrice").value;
      addRoom(type, price);
      form.reset();
    });
  }
  const exportBtn = document.getElementById("exportCSV");
  if (exportBtn) exportBtn.addEventListener("click", exportCSV);
});
