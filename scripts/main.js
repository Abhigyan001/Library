let container = document.querySelector('.container');
let addBook = document.getElementById('add-book');
let form = document.querySelector('.add-book-form');
let bookTitle = document.getElementById('book-title').value;
let bookAuthor = document.getElementById('book-author').value;
let bookPages = document.getElementById('book-pages').value;
let readChoice = document.getElementById('read-book');
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

function evaluateFormData(obj) {
  if(obj.title === '' || obj.author === '' || obj.no_of_pages === 0 || obj.have_read === undefined) {
    console.log('Please make sure all fields are filled & try again!');
  } else {
    myLibrary.push(obj);
    console.log('You have successfully added a new book to the Library!');
  }
}

function addBookToLibrary() {
  // determine if user already read the book
  readChoice.addEventListener('change', (e) => {
    if(e.target.value == 'yes') {
      return true;
    } else {
      return false;
    }
  });

  let userBook = new Book(bookTitle, bookAuthor, bookPages, readChoice);

  // evaluate form data and push to the myLibrary array
  evaluateFormData(userBook);
}

submitForm.addEventListener('click', addBookToLibrary);

function displayBook() {
  // create div el to contain the book object
  let bookContainer = document.createElement('div');
}

// console.log('Hey I am here!');

