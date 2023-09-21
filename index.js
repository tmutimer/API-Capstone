import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
var books = [];

app.use(express.static("public"));

// Cache the books by Tolkien
try {
    // Query for all works by Tolkien
    const bookResponse = await axios.get("http://openlibrary.org/authors/OL26320A/works?language=/languages/eng&limit=1000", {
        headers: {
          Accept: "application/json",
        },
      })
      // Filter the books for ones that have a cover
      books = bookResponse.data.entries.filter((b) => b.covers && b.covers.length > 0);
      console.log(`There are ${books.length} books loaded.`);
    
} catch (error) {
    console.log("Failed to cache books");
}




app.get("/", (req, res) => {
    // Pick a random book to return
  let randomBook = books[Math.floor(Math.random() * books.length)];
  res.render("index.ejs", { book: randomBook });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
