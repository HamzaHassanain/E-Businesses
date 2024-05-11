import LC from "./LC.js";

/*

[

    {
        bookId: ,
        bookTitle: ,
        bookAuthor: ,
        bookImage: "staticstatic\images\book.png",       // default value --> "staticstatic\images\book.png" ---   "path of image"
        bookCategory: 
        bookPrice: ,
        bookQuantity: ,
        bookDescribtion: 
    }

]

*/
const ImageNames = [];

getImageNamesInsideFolder("DBimages"); // relative path from LC.js
seedLocalStorage();

function seedLocalStorage() {
  LC.setJSON("books", []);

  const books = [];
  const Categories = [
    "Software Enginnering",
    "Information Technology",
    "Math",
    "Scince",
  ];
  for (let i = 0; i < 100; i++) {
    books.push({
      bookId: i,
      bookTitle: `Book ${i}`,
      bookAuthor: `Author ${i}`,
      bookImage: `static/DBimages/image${i % 80}.png`, // relative path from index.html or any other html file
      bookCategory: Categories[i % 4],
      bookPrice: i * 10,
      bookQuantity: 1,
      bookDescribtion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    });
  }

  LC.setJSON("books", books);
}

function getImageNamesInsideFolder(folderName) {
  // read file names in a folder
}
