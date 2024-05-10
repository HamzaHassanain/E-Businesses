import LC from "./LC.js";

function BookHTML({
  bookId,
  bookTitle,
  bookAuthor,
  bookImage,
  bookCategory,
  bookPrice,
  bookQuantity,
  bookDescribtion,
}) {
  return `
      <div data-id="book_id" class="book goToBook">
      <form action="" method="get" class="add-to-cart">
        <button class="add-single-book" data-bookid="${bookId}">
          <i class="material-icons">add_shopping_cart</i>
        </button>
      </form>
  
      <div class="img-book">
        <img src="${bookImage}" alt="" />
      </div>
  
      <div class="stars">
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <div class="book-details">
        <div class="title">
          <a href="book.html" class="book-title"> ${bookTitle} </a>
        </div>
        <div class="title">
          <a href="book.html" class="book-creator"> ${bookAuthor} </a>
        </div>
        <div class="title">
          <p class="explain">${bookDescribtion}</p>
        </div>
        <div class="price">
          <span>${bookPrice}$</span>
        </div>
      </div>
    </div>
      `;
}

function GetBooksByCategory() {
  const books = LC.getJSON("books");
  const booksByCategory = new Map();
  if (books) {
    books.forEach((book) => {
      if (!booksByCategory.has(book.bookCategory)) {
        booksByCategory.set(book.bookCategory, []);
      }
      booksByCategory.get(book.bookCategory).push(book);
    });
  }
  return booksByCategory;
}

export { BookHTML, GetBooksByCategory };
