import LC from "./LC.js";
import { BookHTML, GetBooksByCategory } from "./utils.js";
import { SetEventListeners } from "./SingleAddToCart.js";
let SearchSubString = "";
let SearchCategory = "";
const SearchHeader = document.querySelector("#Search");
const searchForm = document.querySelector("#search-from");

SearchHeader.innerHTML = "All Books";

// add search event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  SearchSubString = e.target.search.value;
  if (SearchSubString === "") {
    SearchHeader.innerHTML = "All Books";
  } else {
    SearchHeader.innerHTML = `Search: ${SearchSubString}`;
  }
  PutBooksData();
});

PutCategoriesAside();
PutBooksData();

function PutCategoriesAside() {
  const booksByCategory = GetBooksByCategory();
  const CategoriesAside = document.querySelector("#categories-aside");
  let categoriesAsideHTML = `<nav> <p>Categories</p>`;
  for (let [category, books] of booksByCategory) {
    categoriesAsideHTML += `<a href="#" class="category-item nav-link"> <span> ${category} <span>  </a>`;
  }
  categoriesAsideHTML += `<a href="#" class="category-item nav-link"> <span> All Books <span>  </a>`;
  categoriesAsideHTML += `</nav>`;

  CategoriesAside.innerHTML = categoriesAsideHTML;

  // for each newly created category item, add an event listener
  document
    .querySelectorAll(".category-item.nav-link")
    .forEach((categoryItem) => {
      categoryItem.addEventListener("click", (e) => {
        e.preventDefault();
        SearchCategory = e.target.textContent.trim();

        if (SearchCategory === "All Books") SearchCategory = "";

        SearchHeader.innerHTML = `${SearchCategory}`;
        if (SearchSubString !== "") {
          SearchHeader.innerHTML += `: ${SearchSubString}`;
        }
        PutBooksData();
      });
    });
}

function PutBooksData() {
  const booksByCategory = GetBooksByCategory();
  const booksHTML = document.querySelector("main .books-container");
  const books = LC.getJSON("books");

  if (SearchSubString !== "" && SearchCategory !== "") {
    const books = booksByCategory.get(SearchCategory);
    let booksHTMLString = "";
    books.forEach((book) => {
      if (book.bookTitle.includes(SearchSubString))
        booksHTMLString += BookHTML(book);
    });
    booksHTML.innerHTML = booksHTMLString;
  } else if (SearchSubString !== "") {
    let booksHTMLString = "";
    books.forEach((book) => {
      if (book.bookTitle.includes(SearchSubString))
        booksHTMLString += BookHTML(book);
    });
    booksHTML.innerHTML = booksHTMLString;
  } else if (SearchCategory !== "") {
    const books = booksByCategory.get(SearchCategory);
    let booksHTMLString = "";
    books.forEach((book) => {
      booksHTMLString += BookHTML(book);
    });
    booksHTML.innerHTML = booksHTMLString;
  } else {
    let booksHTMLString = "";
    books.forEach((book) => {
      booksHTMLString += BookHTML(book);
    });
    booksHTML.innerHTML = booksHTMLString;
  }

  SetEventListeners();
}
