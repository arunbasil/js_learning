
import { books } from './filterArray.mjs';
const sortedBooks = books.slice().sort((a, b) => a.yearPublished - b.yearPublished);
console.log(sortedBooks)
