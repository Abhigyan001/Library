let container = document.querySelector('.container');
let addBook = document.getElementById('add-book');
let form = document.querySelector('.add-book-form');
let submitForm = document.getElementById('submit-book');
let message = document.querySelector('.message');
let myLibrary = [];

// hide form
form.style.display = 'none';

// display form
addBook.addEventListener('click', function() {
  form.style.display = 'block';
});

function Book(title, author, no_of_pages = 0, have_read = false) {
  this.title = title;
  this.author = author;
  this.no_of_pages = no_of_pages;
  this.have_read = have_read;
}


function addBookToLibrary(e)  {
  // determine if user already read the book
  e.preventDefault();
  let bookTitle = document.getElementById('book-title').value;
  let bookAuthor = document.getElementById('book-author').value;
  let bookPages = document.getElementById('book-pages').value;
  let readChoice = document.getElementById('read-book').checked; 

  let userBook = new Book(bookTitle, bookAuthor, bookPages, readChoice);
  myLibrary.push(userBook);
  form.style.display = 'none';  

}

submitForm.addEventListener('click', addBookToLibrary);

function displayBook() {
  // create div el to contain the book object
  let bookContainer = document.createElement('div');
}

// console.log('Hey I am here!');

