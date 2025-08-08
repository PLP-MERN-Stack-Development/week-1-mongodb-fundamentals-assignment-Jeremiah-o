const {insertBooks,findBooks,authorBook,yearBook,genreBook,inStock,updatePrice,deleteBook}= require("./insert_books")

const command = process.argv[2]

if(command==='insert'){
    insertBooks()
}
else if(command==='find'){
    findBooks()
}
else if(command==='author'){
    const nameAuthor=process.argv.slice(3).join(' ')
    authorBook(nameAuthor)
}
else if(command==='year'){
    yearBook()
}
else if(command==='genre'){
    const nameGenre=process.argv.slice(3).join(' ')
    genreBook(nameGenre)
}
else if(command==='in-stock'){
    inStock()
}
else if(command==='updatePrice'){ //takes two parameters i.e title and newprice
    const args=process.argv.slice(3)
    const price=Number(args.pop())
    const title=args.join(' ')
    updatePrice(title,price)
}
else if(command==='deleteBook'){// takes one parameter i.e the title
    const bookName=process.argv.slice(3).join(' ')
    deleteBook(bookName)
}
else{
    console.log('invalid command')
}