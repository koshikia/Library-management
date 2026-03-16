const API = "http://localhost:3000/api";

// LOGIN
async function login(email, matKhau) {

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            matKhau
        })
    });

    return res.json();
}


// MƯỢN SÁCH
async function borrowBook(docGiaId, maVach) {

    const res = await fetch(`${API}/borrows`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            docGiaId,
            maVach
        })
    });

    return res.json();
}


// TRẢ SÁCH
async function returnBook(maVach) {

    const res = await fetch(`${API}/returns`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            maVach
        })
    });

    return res.json();
}


// GIA HẠN
async function renewBook(phieuMuonId, lyDo) {

    const res = await fetch(`${API}/renew`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            phieuMuonId,
            lyDo
        })
    });

    return res.json();
}