import LC from "./LC.js";
import { valid, showPopup, hidePopup } from "./place_orderJS.js";
let totalPrice = 0,
  totalQuantity = 0;
let cart = Array(LC.getJSON("cart"))[0];

document.addEventListener("DOMContentLoaded", () => {
  let checker = checkCart();
  init(checker);
});

let checkCart = () => {
  if (cart.length == 0) {
    return false;
  }
  return true;
};

function handleEmptyCart() {
  console.log("Cart is empty");
  document.querySelector(".save-cart").style.display = "none";
  document.querySelector(".buy").style.display = "none";
  document.querySelector(".empty-cart").style.display = "block";
}

function displayBooks() {
  for (let i = 0; i < cart.length; i++) {
    let book = cart[i];
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `<div class="book">
      <div class="image">
        <img src="${book.bookImage}" alt="Book" />
      </div>
      <div class="info">
        <div class="title">
          <h1>${book.bookTitle}</h1>
        </div>
        <div class="author">By : ${book.bookAuthor}</div>
        <div class="rate">
          <ul>
            <li class="fa fa-star checked"></li>
            <li class="fa fa-star checked"></li>
            <li class="fa fa-star checked"></li>
            <li class="fa fa-star checked"></li>
            <li class="fa fa-star"></li>
          </ul>
        </div>
        <div class="summary">
          <p>${book.bookDescribtion}</p>
        </div>
      </div>

      <div class="card">
        <div class="price">
          <span>Price:</span>
          <span class="mid">${book.bookPrice} $</span>
        </div>

        <div class="quantity">
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            name="book_id"
            id="${book.bookId}"
            min="1"
            value="${book.bookQuantity}"
          />
        </div>
        <div class="buttons-group">
          <button
            type="submit"
            formaction=""
            formmethod="post"
            formnovalidate
            class="rmv-btn"
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>`;
    document.querySelector(".container").appendChild(bookDiv);
  }
}

function calctotalPrice() {
  totalPrice = 0;
  let cart = Array(LC.getJSON("cart"))[0];
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].bookPrice * cart[i].bookQuantity;
  }
  document.querySelector(".buy .group_flex div:nth-child(1)").innerText =
    "Total Price: " + totalPrice + " $";
}
function calctotalQuantity() {
  totalQuantity = 0;
  let cart = Array(LC.getJSON("cart"))[0];
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += Number(cart[i].bookQuantity);
  }
  document.querySelector(".buy .group_flex div:nth-child(2)").innerText =
    "Total Quantity: " + totalQuantity;
}

function handleRemoveButtons() {
  let removeButtons = document.querySelectorAll(".rmv-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Here we are in the remove button event listener");
      e.preventDefault();
      let bookId =
        e.target.parentElement.parentElement.querySelector(
          ".quantity input"
        ).id;
      let idx = -1;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].bookId == bookId) {
          idx = i;
          break;
        }
      }
      cart.splice(idx, 1);
      LC.setJSON("cart", cart);
      location.reload();
    });
  });
}

function handleQuantityChange() {
  let quantityInputs = document.querySelectorAll(".quantity input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      let bookId = e.target.id;
      let newQuantity = e.target.value;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].bookId == bookId) {
          console.log(typeof cart[i].bookQuantity, typeof newQuantity);
          cart[i].bookQuantity = newQuantity;
          break;
        }
      }
    });
  });
}

function handleSaveCart() {
  let saveCartBtn = document.querySelector(".save-cart");
  saveCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleQuantityChange();
    LC.setJSON("cart", cart);
    location.reload();
  });
}
let clearCartPlaceOrder = () => {
  document.querySelector("#placeOrderBtn").addEventListener("click", (e) => {
    e.preventDefault();
    if (valid === true) {
      cart = [];
      LC.setJSON("cart", cart);
      showPopup("Order has been placed successfully");
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  });
};

let init = (checker) => {
  if (checker) {
    cart = Array(LC.getJSON("cart"))[0];
    displayBooks();
    calctotalPrice();
    calctotalQuantity();
    if (document.querySelector(".rmv-btn")) {
      handleRemoveButtons();
      handleQuantityChange();
      clearCartPlaceOrder();
    }
    if (document.querySelector(".save-cart")) {
      handleSaveCart();
    }
  } else {
    handleEmptyCart();
  }
};
