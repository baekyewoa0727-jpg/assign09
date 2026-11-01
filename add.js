const API_url = "https://6ae1b574bbb541292299076b.mockapi.io/Book";

let books=[];
let editingId=null;

//서버와 통신하는 JS - get,post,patch,delete
//html을 조작하는 JS - render,edit,showMessage, search

async function getBooks(){
    try{
    const response = await fetch (API_url);
    if(!response.ok) throw new Error("목록 조회 실패");
    books = await response.json(book);
    renderBooks(book);
    } catch (error){
        showMessage (error.message,"red");
    }
}
getBooks();

async function postBooks(book){
    try{
        const response = await fetch (API_url,{
            method :"POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify(book)
        
        });
        if(!response.ok) throw new Error ("추가 실패");
        showMessage("success!", "green");
        books = await response.json(book);
        renderBooks(book);
    } catch(error){
        showMessage(error.message,"red");
    }
}

ment.getElementById("input").addEventListener("submit",async function(event{
    
    book {
        title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        date = document.getElementById("date").value,
        rating = document.querySelector('input[name=rating]:checked').value

    }

    if (id == null){
        postBooks(book);
    } else{
        putBooks(id, book);
    }
}))

async function putBooks(id, book){
    try{
        const response = await fetch(`${API_url}/${id}`, {
            method"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(book)
        });
        if(!response.ok) throw new Error("수정 실패");
        showMessage("수정되었습니다", "green");
        getBooks();
    }catch(error){
        showMessage(error.message,"red");
    }
}

async function deleteBooks(id){
if (confirm("정말 삭제하시겠습니까?")){
        try {
        const response = awati fetch(`${API_url}/${id}`, {
                method: "DELETE"});

                if (!response.ok) throw new Error("삭제 실패");
                showMessage("삭제 성공", "green");
                getBooks();
    } catch(error){
        showMessage(error.message,"red");
    }
}
}
