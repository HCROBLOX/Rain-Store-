// admin.js
import { db, collection, getDocs, updateDoc, doc } from './firebase.js';

const orderTable = document.getElementById('adminOrderTable');

// Hàm tải danh sách đơn hàng
async function loadOrders() {
    if(!orderTable) return;
    orderTable.innerHTML = "<tr><td colspan='6'>Đang tải dữ liệu...</td></tr>";

    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        orderTable.innerHTML = ""; // Xóa dữ liệu cũ

        querySnapshot.forEach((documentSnapshot) => {
            const order = documentSnapshot.data();
            const orderId = documentSnapshot.id;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b>${order.name}</b></td>
                <td><span class="badge-service">${order.service}</span></td>
                <td>
                    <p>TK: <code>${order.account}</code></p>
                    <p>MK: <code>${order.pass}</code></p>
                </td>
                <td>${order.note || 'Không có'}</td>
                <td><span class="status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>
                    <select class="status-select" data-id="${orderId}">
                        <option value="Đang chờ" ${order.status === 'Đang chờ' ? 'selected' : ''}>Đang chờ</option>
                        <option value="Đang cày" ${order.status === 'Đang cày' ? 'selected' : ''}>Đang cày</option>
                        <option value="Hoàn thành" ${order.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                    </select>
                </td>
            `;
            orderTable.appendChild(tr);
        });

        // Bắt sự kiện thay đổi trạng thái đơn hàng
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id = e.target.getAttribute('data-id');
                const newStatus = e.target.value;
                
                const orderRef = doc(db, "orders", id);
                await updateDoc(orderRef, { status: newStatus });
                alert("Đã cập nhật trạng thái đơn hàng!");
                loadOrders(); // Tải lại bảng
            });
        });

    } catch (error) {
        console.error("Lỗi khi tải đơn hàng: ", error);
    }
}

// Chạy hàm khi trang được load
window.addEventListener('DOMContentLoaded', loadOrders);
