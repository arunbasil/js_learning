const books = [
    { title: "The Road Ahead", author: "Bill Gates", yearPublished: 1995, price: 25.99 },
    { title: "Walter Isaacson", author: "Steve Jobs", yearPublished: 2011, price: 30.00 },
    { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", yearPublished: 2010, price: 12.99 },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", yearPublished: 1951, price: 22.00 },
    { title: "Brave New World", author: "Aldous Huxley", yearPublished: 2000, price: 19.99 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, price: 20.99 }
];


//Filter Method
// const booksAfter2000 = books.filter(book => book.yearPublished > 2000);
// console.log('Books published after 2000:', booksAfter2000);

//FOR LOOP - If not using Filter methods then manually use for loop like below
// const booksAfter20s = [];
// for (i=0; i<books.length;i++){
//     if(books[i].yearPublished >=2000){
//         booksAfter20s.push(books[i])
//     }
// }   
// console.log(booksAfter20s)

//FOR EACH - Can Achieve the same using For Each
const booksAfter2s = []
books.forEach(book => {
    if(book.yearPublished >=2000){
        booksAfter2s.push(book);}
    });
console.log(booksAfter2s)



export { books };