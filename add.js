 const API_url ="https://6ae1b574bbb541292299076b.mockapi.io/Book";

    let books =[];
    let editingId =null;


async function getBooks(){
    try{
        const response = await fetch(API_url);
        if (!response.ok) throw new error("목록 조회 실패 ");
        books = await response.json();
        searchBooks();

    } catch(error){
        showMessage(error.message,"red");
    }
}
getBooks();

