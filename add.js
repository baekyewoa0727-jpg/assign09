 const API_url ="https://6ae1b574bbb541292299076b.mockapi.io/Book";

    let books =[];
    let editingId =null;

//get
async function getBooks(){
    try{
        const response = await fetch(API_url);
        if (!response.ok) throw new Error("목록 조회 실패 ");
        books = await response.json();
        searchBooks();

    } catch(error){
        showMessage(error.message,"error");
    }
}
getBooks();

//post 
async function postBooks(){
    try{
        const response =await fetch(API_url,{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(book)
            });

            if (!response.ok) throw new Error("추가실패");
            showMessage("추가되었습니다","green");
            //resetForm();
        
    } catch(error){
        showMessage(error.message,"error");
    }
}

document.getElementById("input").addEventListener("submit", async function(event) {
    event.preventDefault();

    document.querySelector("book");

    if (editingId==null){
        postBooks(book);
    } else{
        putBooks(editingId,book);
    }
});

async function putBooks(){

}

async function deleteBooks(){

}