import LC from "./LC.js";


let idx = random(0, LC.getJSON("books").length - 1);

let book = LC.getJSON("books")[idx];
/*
 <div class="description">
          <p>small description about the book.</p>
        </div>
      </div>

      <div class="card">
        <div class="price">
          <span>Price:</span>
          <span> book price $</span>
        </div>

        <div class="quantity">
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            form="changeQuantity"
            name="quantity"
            id="quantity"
            min="1"
            value="1"
          />
        </div>
*/

for (let i = 0; i < 4; i++) {
    let book = document.getElementsByClassName("book")[i];
    let image = book.querySelector(".image img");
    let title = book.querySelector(".info .title");
    let author = book.querySelector(".info .author");
    let desc = document.querySelector(".description p");
    let price = book.querySelector(".price span:last-child");

}




function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
