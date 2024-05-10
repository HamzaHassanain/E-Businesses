// rename all images inside this folder
const path = require("path");
const fs = require("fs");

const folderName = path.join(__dirname, "/");

fs.readdir(folderName, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file, index) => {
    const oldPath = folderName + file;
    const newPath = folderName + `image${index}.png`;

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`${oldPath} has been renamed to ${newPath}`);
    });
  });
});
