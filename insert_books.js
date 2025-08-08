// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
//insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 

// 1. Find all books:

async function findBooks() {
  const client = new MongoClient(uri);
  try {
    //establish a connection
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result=await collection.find().toArray()
    console.log("There are "+result.length+" books available: ",result)

    client.close()
    console.log("connection closed")
  } catch (error) {
    console.log("an error ocurred ",error)
  }finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}
//findBooks()

// 2. find by a specific author
async function authorBook(name) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result=await collection.find({ author: name }).toArray()
    if(result.length==0){
      console.log("There are no books written by ",name)
    }
    else if(result.length==1){
      console.log("There is only 1 book written by "+name+":",result)
    }
    else{
      console.log("There are "+result.length+" available books under the author "+name+ " are: ",result)
    }
    client.close()
    console.log("connection closed")
  } catch (error) {
    console.log("an error ocurred ",error)
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}
//authorBook('Herman Melville') 
// insert the name of the author as the parameters

//3.Find books published after 1950:
async function yearBook() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result=await collection.find({ published_year: { $gt: 1950 }}).toArray()
    console.log("There are "+result.length+" available books published after 1950 are: ",result)

    client.close()
    console.log("connection closed")
  } catch (error) {
    console.log("an error ocurred ",error)
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}
//yearBook()

//4.Find books in a specific genre:
async function genreBook(nameOfGenre) { 
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result=await collection.find({ genre:nameOfGenre }).toArray()
    if(result.length==0){
      console.log('There are no books under the genre ',nameOfGenre)
    }
    else if(result.length==1){
      console.log('There is only 1 book under the genre ',nameOfGenre+":",result)
    }
    else{
      console.log("There are "+result.length+" available books under the genre "+nameOfGenre+ ":",result)
    }
    
    client.close()
    console.log("connection closed")
  } catch (error) {
    console.log("an error ocurred ",error)
  }  finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}
// enter genre as a parameter
//genreBook("Fiction")

//5. Instock books
async function inStock() {  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result=await collection.find({ in_stock: true }).toArray()
    console.log("There are "+result.length+" books in stock: ",result)

    client.close()
    console.log("connection closed")
  } catch (error) {
    console.log("an error ocurred ",error)
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}
//update price of a specific book
async function updatePrice(bookTitle,Nprice) {
  const client=new MongoClient(uri)
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result= await collection.updateOne({title:bookTitle},{$set:{price:Nprice}})
    if (result.matchedCount === 0) {
      console.log(`No book found with title "${bookTitle}"`);
    } 
    else {
      console.log(`Updated ${result.modifiedCount} book(s) successfully`);
    }
  } catch (error) {
    console.log("an error ocurred ",error)
  }
}

//deleting a book by its title
async function deleteBook(bookTitle) {
  const client=new MongoClient(uri)
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result= await collection.deleteOne({title:bookTitle})
    if (result.deletedCount === 0) {
      console.log(`No book found with title "${bookTitle}"`);
    } 
    else {
      console.log(`Deleted ${result.deletedCount} book(s) successfully`);
    }
  } catch (error) {
    console.log("an error ocurred ",error)
  }
}
module.exports={insertBooks,findBooks,authorBook,yearBook,genreBook,inStock,updatePrice,deleteBook}