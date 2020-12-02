/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */

const addBook = document.getElementById('add-book');
const form = document.querySelector('.add-book-form');
const submitForm = document.getElementById('submit-book');


let myLibrary = [];

function Book(title, author, no_of_pages = 0, have_read) {
  this.title = title;
  this.author = author;
  this.no_of_pages = no_of_pages;
  this.have_read = have_read;
}

// display form
addBook.addEventListener('click', () => {
  form.classList.toggle('show-form');
});

const addBookToLibrary = (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('book-title').value;
  const bookAuthor = document.getElementById('book-author').value;
  const bookPages = document.getElementById('book-pages').value;
  const readChoice = document.getElementById('read-book').checked;
  const userBook = new Book(bookTitle, bookAuthor, bookPages, readChoice);

  if (bookTitle && bookAuthor && bookPages) {
    myLibrary.unshift(userBook);

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    form.style.display = 'none';
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = 0;
    readChoice.value = false;
    location.reload();
  } else {
    document.getElementById('error').style.display = 'block';
    setTimeout(
      () => {
        document.getElementById('error').style.display = 'none';
      }, 3000,
    );
  }
};

// delete book from the library
const deleteBookFromLibrary = (book) => {
  myLibrary.splice(book, 1);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  location.reload();
};

// get index of each book in the library
const bookIndex = (books, index) => {
  for (let i = 0; i < books.length; i += 1) {
    index = i;
  }

  return index;
};

const displayBooks = () => {
  // retrieve books from localStorage
  const libraryBooks = JSON.parse(localStorage.getItem('myLibrary'));

  for (let i = 0; i < libraryBooks.length; i += 1) {
    // create DOM elements
    const bookParent = document.querySelector('#books');
    const book = document.createElement('div');
    const bookBody = document.createElement('div');
    const title = document.createElement('h6');
    const numOfPages = document.createElement('p');
    const authorForBook = document.createElement('p');
    const delBtn = document.createElement('button');
    const bookFooter = document.createElement('div');
    const readButton = document.createElement('button');
    let index;
    const id = bookIndex(libraryBooks, index);
    book.setAttribute('id', id);
    let readstatus = libraryBooks[i].have_read;

    delBtn.addEventListener('click', (book_id) => {
      book_id = book.getAttribute('id');
      deleteBookFromLibrary(book_id);
      bookParent.removeChild(book);
    });

    if (readstatus) {
      readButton.textContent = 'I have read the book';
      readButton.classList = 'btn btn-sm btn-success ml-2';
    } else {
      readButton.innerHTML = 'I have not read the book';
      readButton.classList = 'btn btn-sm btn-info ml-2';
    }

    readButton.addEventListener('click', () => {
      if(readstatus) {
        readButton.textContent = 'I not have read the book';
        readButton.classList = 'btn btn-sm btn-info ml-2';
        readstatus = false;
      } else {
        readButton.innerHTML = 'I have read the book';
        readButton.classList = 'btn btn-sm btn-success ml-2';
        readstatus = true;
      }
    });

    bookBody.appendChild(title);
    bookBody.appendChild(authorForBook);
    bookBody.appendChild(numOfPages);
    book.appendChild(bookBody);
    book.appendChild(bookFooter);
    bookParent.appendChild(book);

    book.classList.add('card', 'col-lg-4', 'col-sm-12', 'col-md-5', 'mx-4', 'mt-4');
    bookBody.classList = 'card-body';
    bookFooter.classList = 'card-footer';
    delBtn.classList = 'btn btn-sm btn-danger ';
    title.textContent = `Title: ${libraryBooks[i].title}`;
    authorForBook.textContent = `Author: ${libraryBooks[i].author}`;
    numOfPages.textContent = `Pages: ${libraryBooks[i].no_of_pages}`;

    if (libraryBooks[i]) {
      bookFooter.appendChild(delBtn);
      delBtn.textContent = 'Delete Book';
      bookFooter.appendChild(readButton);
    }
  }
};

submitForm.addEventListener('click', addBookToLibrary);

(function showBooks() {
  if (!localStorage.myLibrary) {
    displayBooks();
  } else {
    const savedData = localStorage.getItem('myLibrary');
    const data = JSON.parse(savedData);
    myLibrary = data;
    displayBooks();
  }
}());
/* eslint-enable camelcase */
/* eslint-disable no-restricted-globals */