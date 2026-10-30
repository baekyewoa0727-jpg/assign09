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

async function putBooks(id, book){
    try{
        const response = await fetch (API_url,)
    }
}

async function deleteBooks(id){

    try {
        
    }
}

document.getElementById("input").addEventListener("submit",async function(event{
    
    book {
        title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        date = document.getElementById("date").value,
        rating = document.querySelector('input[name=rating]:checked').value

    }

    if (editingId == null){
        postBooks(book);
    } else{
        putBooks(id, book);
    }
}))