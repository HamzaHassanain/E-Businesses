import LC from "./LC.js";
import { BookHTML, GetBooksByCategory } from "./utils.js";
/*

        bookId: ,
        bookTitle: ,
        bookAuthor: ,
        bookImage: "staticstatic\images\book.png",       // default value --> "staticstatic\images\book.png" ---   "path of image"
        bookCategory: 
        bookPrice: ,
        bookQuantity: ,
        bookDescribtion: 

*/

PutCatigories();
PutPopularBooks();
function PutCatigories() {
  const booksByCategory = GetBooksByCategory();

  const Categories = document.querySelector("#catigories");
  let categoriesHTML = ``;
  categoriesHTML += ` <div class="head">Catigories</div>`;
  for (let [category, books] of booksByCategory) {
    categoriesHTML += `<div class="type-book">${category}</div>`;
    let booksHTML = `<div class="books">`;
    books.forEach((book, indx) => {
      if (indx > 4) return;
      booksHTML += BookHTML(book);
    });
    booksHTML += "</div>";

    categoriesHTML += booksHTML;
  }

  Categories.innerHTML = categoriesHTML;
}

function PutPopularBooks() {
  const books = LC.getJSON("books");

  const PopularBooks = document.querySelector(".popular-books");
  let popularBooksHTML = ``;
  popularBooksHTML += ` <div class="head">Popular Books</div>`;
  let booksHTML = `<div class="books">`;

  // select random 4 books
  for (let i = 0; i < 4; i++) {
    booksHTML += BookHTML(books[random(0, books.length - 1)]);
  }

  booksHTML += "</div>";

  popularBooksHTML += booksHTML;

  PopularBooks.innerHTML = popularBooksHTML;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
