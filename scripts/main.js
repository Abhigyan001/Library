let container = document.querySelector('.container');
let myLibrary = [];

function Book(title, author, no_of_pages = 0, have_read = false) {
  this.title = title;
  this.author = author;
  this.no_of_pages = no_of_pages;
  this.have_read = have_read;
}

function addBookToLibrary() {
  let book1 = new Book('A beautiful mind', 'John Doe', 500, false);
  myLibrary.push(book1);  
}

function displayBook() {
  // create div el to contain the book object
  let bookContainer = document.createElement('div');
}