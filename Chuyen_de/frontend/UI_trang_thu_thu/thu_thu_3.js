// Lấy dữ liệu từ localStorage
let borrows = JSON.parse(localStorage.getItem("borrows")) || [];

// HIỂN THỊ BẢNG
function renderTable() {
    let table = document.getElementById("borrowList");
    if (!table) return; // Bảo vệ nếu table chưa tồn tại
    
    table.innerHTML = "";

    borrows.forEach((b, index) => {
        table.innerHTML += `
        <tr>
            <td class="p-5 text-left font-medium text-slate-800">${b.reader}</td>
            <td class="p-5 text-left text-blue-700 font-medium">${b.book}</td>
            <td class="p-5 text-slate-500">${b.borrowDate}</td>
            <td class="p-5 text-slate-500">${b.returnDate}</td>
            <td class="p-5">
                <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold border ${b.status === 'Đã trả sách' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}">
                    ${b.status}
                </span>
            </td>
            <td class="p-5">
                <button onclick="returnBook(${index})"
                    class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium px-5 py-2.5 rounded-lg shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300">
                    Trả sách
                </button>
            </td>
        </tr>
        `;
    });
}

// MƯỢN SÁCH
function borrowBook() {
    let reader = document.getElementById("reader").value;
    let book = document.getElementById("book").value;
    let borrowDate = document.getElementById("borrowDate").value;
    let returnDate = document.getElementById("returnDate").value;

    if (reader == "" || book == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    let borrow = {
        reader,
        book,
        borrowDate,
        returnDate,
        status: "Đang mượn"
    };

    borrows.push(borrow);
    localStorage.setItem("borrows", JSON.stringify(borrows));
    renderTable();
    clearForm();
}

// TRẢ SÁCH
function returnBook(index) {
    borrows[index].status = "Đã trả sách";
    localStorage.setItem("borrows", JSON.stringify(borrows));
    renderTable();
}

// XÓA FORM
function clearForm() {
    document.getElementById("reader").value = "";
    document.getElementById("book").value = "";
    document.getElementById("borrowDate").value = "";
    document.getElementById("returnDate").value = "";
}

// Chạy lần đầu khi trang load xong
window.onload = renderTable;