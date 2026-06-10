// app.js
import { db, collection, addDoc } from './firebase.js';

document.getElementById('orderForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ Giao diện khách hàng (index.html)
    const customerName = document.getElementById('customerName').value;
    const gameAccount = document.getElementById('gameAccount').value;
    const gamePass = document.getElementById('gamePass').value;
    const serviceType = document.getElementById('serviceType').value;
    const note = document.getElementById('note').value;

    try {
        // Gửi dữ liệu lên bộ sưu tập "orders" của Firebase
        await addDoc(collection(db, "orders"), {
            name: customerName,
            account: gameAccount,
            pass: gamePass,
            service: serviceType,
            note: note,
            status: "Đang chờ", // Trạng thái mặc định
            createdAt: new Date().toISOString()
        });

        alert("🎯 Đặt đơn cày thuê thành công! Vui lòng chờ liên hệ.");
        document.getElementById('orderForm').reset();
    } catch (error) {
        console.error("Lỗi khi đặt đơn: ", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
});
