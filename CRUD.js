const API_url = "https://6ae1b574bbb541292299076b.mockapi.io/Book";

let books = [];
let editingId = null;

//서버와 통신하는 JS - get,post,patch,delete 
//html을 조작하는 JS - render,edit,showMessage, search 

async function getBooks() {
    try {
        const response = await fetch(API_url);
        if (!response.ok) throw new Error("목록 조회 실패");
        books = await response.json();
        renderBooks(books);
    } catch (error) {
        showMessage(error.message, "red");
    }
}
getBooks();

async function postBooks(book) {
    try {
        const response = await fetch(API_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)

        });
        if (!response.ok) throw new Error("추가 실패");
        showMessage("success!", "green");
        await getBooks();
    } catch (error) {
        showMessage(error.message, "red");
    }
}

document.getElementById("input").addEventListener("submit", async function (event) {
    event.preventDefault();

    const book = {
        title: document.getElementById("titleInput").value,
        author: document.getElementById("author").value,
        date: document.getElementById("dateInput").value,
        rating: document.querySelector('input[name="rating"]:checked').value

    }

    if (editingId == null) {
        postBooks(book);
    } else {
        putBooks(editingId, book);
    }
});

async function putBooks(id, book) {
    try {
        const response = await fetch(`${API_url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
        if (!response.ok) throw new Error("수정 실패");
        showMessage("수정되었습니다", "green");
        editingId = null;
        getBooks();
    } catch (error) {
        showMessage(error.message, "red");
    }
}

async function deleteBooks(id) {
    if (confirm("정말 삭제하시겠습니까?")) {
        try {
            const response = await fetch(`${API_url}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("삭제 실패");
            showMessage("삭제 성공", "green");
            getBooks();
        } catch (error) {
            showMessage(error.message, "red");
        }
    }
}
function showMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
}

function renderBooks(bookArray) {
    const tbody = document.getElementById("bookList");
    tbody.innerHTML = "";
    bookArray.forEach(function (book) {
        const row = document.createElement("tr");
        row.innerHTML = ` 
            <td>${book.title}</td> 
            <td>${book.author}</td> 
            <td>${book.date}</td> 
            <td>${book.rating}</td> 
            <td> 
                <button type="button" onclick="editBook('${book.id}')">수정</button> 
                <button type="button" onclick="deleteBooks('${book.id}')">삭제</button> 
            </td> 
        `;
        tbody.appendChild(row);
    });
}
function searchBooks() {
    const keyword = document.getElementById("search").value;
    const searchResult = books.filter(function (book) {
        return book.title.includes(keyword);

    });
    renderBooks(searchResult);
}

function editBook(id) {
    const book = books.find(function (book) {
        return book.id == id;
    });

    document.getElementById("titleInput").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("dateInput").value = book.date;
    document.querySelector(`input[name="rating"][value="${book.rating}"]`).checked = true;

    editingId = id;
}