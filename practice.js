const API_url = "https://6ae1b574bbb541292299076b.mockapi.io/Book";

let books = [];
let editingId = null;

//Read

async function getBooks() {
    try {
        const response = await fetch(API_url);
        //서버에 요청을 보내는 명령 . 서버에서 응답이 돌아올때까지 대기 -> 결과를 response에 저장
        // fetch(API_url) : 서버에 요청
        // await : 응답을 기다림
        // const response : 응답 결과를 변수에 저장

        if (!response.ok) throw new Error("목록 조회 실패");
        books = await response.json();
        searchBooks();
    }
    catch (error) {
        showMessage(error.message, "error");
    }
}
getBooks();

//화면 출력

//POST
async function postBooks(book) {
    try {
        const response = await fetch(API_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });

        if (!response.ok) throw new Error("추가 실패");
        showMessage("추가되었습니다", "green");
        getBooks();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

//객체 만들기 
document.getElementById("input").addEventListener("submit", async function (event) {
    event.preventDefault();

    const book = {
        title: document.getElementById("titleInput").value,
        author: document.getElementById("author").value,
        date: document.getElementById("dateInput").value,
        rating: document.querySelector('input[name="rating"]:checked').value
    };

    if (editingId == null) {
        await postBooks(book);
    } else {
        await putBooks(editingId, book);
    }
});

//update
async function putBooks(editingId,book) {
    try {
        const response = await fetch(`${API_url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
        if (!response.ok) throw new Error("수정 실패");
        showMessage("수정되었습니다", "green");
        getBooks();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

//delete
async function deleteBooks(id) {
    if (confirm("정말 삭제하시겠습니까?")) {
        try {
            const response = await fetch(`${API_url}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("삭제 실패");

            showMessage("Delete complete", "green");
            getBooks();

        } catch (error) {
            showMessage(error.message, "error");
        }
    }
}

function showMessage(message,color){
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;

    if(color =="green"){
        messageElement.querySelector.color="green"; 
    } else {
        messageElement.querySelector.color="red";
    }
}

function renderBooks(bookArray){
    const bookList = document.getElementById("bookList");
    bookList.innerHTML="";
    bookArray.forEach(function(book){
        const row = document.createElement("tr");
        row.innerHTML=`
         <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
            <td>${book.rating}</td>
            <td>
                <button onclick="editBook('${book.id}')">수정</button>
                <button onclick="deleteBooks('${book.id}')">삭제</button>
            </td>
        `;
        bookList.appendChild(row);
    });
}


function searchBooks(){
    const keyword = document.getElementById("search").value;
    const searchResult = books.filter(function(book){
        return book.title.includes(keyword);

    });
    renderBooks(searchResult);
}

function editBook(id){
    const book = books.find(function(book){
        return book.id == id;
    });

     document.getElementById("titleInput").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("dateInput").value = book.date;

    document.querySelector(`input[name="rating"][value="${book.rating}"]`).checked = true;

    editingId = id;
}
//서버와 통신하는 JS - get,post,patch,delete
//html을 조작하는 JS - render,edit,showMessage