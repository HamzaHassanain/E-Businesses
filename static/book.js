import LC from "./LC.js";

let takenIndices = [];
let initCart = LC.getJSON("cart") || [];
LC.setJSON("cart", initCart);
addMainBookData();
addSimilarBooks();
addToCart();

function addMainBookData() {
  let idx = random(0, LC.getJSON("books").length - 1);
  let book = LC.getJSON("books")[idx];
  let selectedBook = document.getElementsByClassName("book")[0];
  let elements = {
    image: selectedBook.querySelector(".image img"),
    title: selectedBook.querySelector(".info .title"),
    author: selectedBook.querySelector(".info .author"),
    desc: selectedBook.querySelector(".info .description p"),
    price: selectedBook.querySelector(".card .price span:last-child"),
  };
  let { image, title, author, desc, price } = elements;
  title.textContent = book.bookTitle;
  author.textContent = book.bookAuthor;
  desc.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
  price.textContent = book.bookPrice + " $";
  image.src = book.bookImage;

  takenIndices.push(idx);
}
function addSimilarBooks() {
  for (let i = 1; i < 4; i++) {
    let idx = random(0, LC.getJSON("books").length - 1);
    while (takenIndices.includes(idx)) {
      idx = random(0, LC.getJSON("books").length - 1);
    }

    let addedBook = LC.getJSON("books")[idx];
    let selectedBook = document.getElementsByClassName("book")[i];
    let image = selectedBook.querySelector(".img-book img");
    let title = selectedBook.querySelector(".book-details .title:first-child");

    let author = selectedBook.querySelector(
      ".book-details .title:nth-child(2)"
    );
    let desc = selectedBook.querySelector(".book-details .title p");
    let price = selectedBook.querySelector(".book-details .price span");

    image.src = addedBook.bookImage;
    //console.log(title.querySelector("a"));
    title.querySelector("a").textContent = addedBook.bookTitle;
    author.innerHTML = addedBook.bookAuthor;
    desc.innerHTML = "Description of book " + idx;
    price.innerHTML = addedBook.bookPrice + " $";
    takenIndices.push(idx);
  }
  //console.log(takenIndices);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function addToCart() {
  const addToCartButton = document.querySelector("#changeQuantity button");
  addToCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    let book = LC.getJSON("books")[takenIndices[0]];
    let quantity = document.querySelector(".quantity input").value;
    book.bookQuantity = quantity;
    let cart = LC.getJSON("cart");
    cart.push(book);
    LC.setJSON("cart", cart);
    console.log(LC.getJSON("cart"));
    document.getElementById("changeQuantity").reset();
  });
}
