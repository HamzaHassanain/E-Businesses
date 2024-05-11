import LC from "./LC.js";

export function SetEventListeners() {
  const AddToCartButtons = document.querySelectorAll(".add-single-book");
  AddToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let bookId;
      if (isButton(e.target)) {
        bookId = e.target.dataset.bookid;
      } else {
        bookId = e.target.parentElement.dataset.bookid;
      }
      console.log(bookId);
      AddToCart(bookId);
    });
  });
}

function AddToCart(bookId) {
  const cart = LC.getJSON("cart") || [];
  const book = LC.getJSON("books").find(
    (book) => Number(book.bookId) === Number(bookId)
  );
  const cartItem = cart.find((item) => Number(item.bookId) === Number(bookId));

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  LC.setJSON("cart", cart);
}

function isButton(target) {
  return target.tagName === "BUTTON";
}
