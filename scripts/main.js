let container = document.querySelector('.container');
let addBook = document.getElementById('add-book');
let form = document.querySelector('.add-book-form');
let inputField = document.querySelector('.book-details-form');
let submitForm = document.getElementById('submit-book');
let message = document.querySelector('.message');

let myLibrary = [];

function Book(title, author, no_of_pages = 0, have_read = false) {
  this.title = title;
  this.author = author;
  this.no_of_pages = no_of_pages;
  this.have_read = have_read;
}

// hide form
form.style.display = 'none';

// display form
addBook.addEventListener('click', function() {
  form.style.display = 'block';
});

function addBookToLibrary(e)  {
  e.preventDefault();
  let bookTitle = document.getElementById('book-title').value;
  let bookAuthor = document.getElementById('book-author').value;
  let bookPages = document.getElementById('book-pages').value;
  let readChoice = document.getElementById('read-book').checked;
  let userBook = new Book(bookTitle, bookAuthor, bookPages, readChoice);
  
  myLibrary.push(userBook);

  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
  

  form.style.display = 'none';
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = 0;
  readChoice.value = false;
  location.reload();
}

// delete book from the library
function deleteBookFromLibrary(book) {  
  myLibrary.splice(book, 1);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));  
}

// get index of each book in the library
function bookIndex(books, index) {
  for(let i = 0; i < books.length; i++) {
    index = i;
  }

  return index;
}

function displayBooks() {
  
  // retrieve books from localStorage
  let libraryBooks = JSON.parse(localStorage.getItem('myLibrary'));
  

  for(let i=0; i < libraryBooks.length; i++) {
    // create div el to contain the book object
    let bookParent = document.querySelector('#books');
    let book = document.createElement('div');
    let bookBody = document.createElement('div');
    let title = document.createElement('h6');
    let numOfPages = document.createElement('p');
    let authorForBook = document.createElement('p');
    let delBtn = document.createElement('button');
    let bookFooter = document.createElement('div');
    let index;
    let id = bookIndex(libraryBooks, index);
    book.setAttribute('id', id);

    delBtn.addEventListener('click', (book_id) => {
      book_id = book.getAttribute('id');
      deleteBookFromLibrary(book_id); 
      bookParent.removeChild(book);   
    });

    bookBody.appendChild(title);
    bookBody.appendChild(authorForBook);
    bookBody.appendChild(numOfPages);
    book.appendChild(bookBody);
    book.appendChild(bookFooter);
    bookParent.appendChild(book);
  
  // add book title to h3 tag
  
    book.classList.add('card', 'col-5', 'mr-3', 'mt-4');
    bookBody.classList = 'card-body';
    bookFooter.classList = 'card-footer';
    delBtn.classList = 'btn btn-md btn-danger';
    title.textContent = `Title: ${libraryBooks[i].title}`;
    authorForBook.textContent = `Author: ${libraryBooks[i].author}`;
    numOfPages.textContent = `Pages: ${libraryBooks[i].no_of_pages}`

    if(libraryBooks[i]) {
      bookFooter.appendChild(delBtn);
      delBtn.textContent = 'Delete Book';
    }
  }
}



submitForm.addEventListener('click', addBookToLibrary);

(function showBooks() {
  if (!localStorage.myLibrary) {
    displayBooks();
  } else {
    let savedData = localStorage.getItem('myLibrary');
    data = JSON.parse(savedData);
    myLibrary = data;
    displayBooks();
  }
})();
