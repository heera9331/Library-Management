import express from "express";
import bodyParser from "body-parser"; "body-parser";
import connectDB from "./config/connection.js";

import Admin from "./models/Admin.js";
import Student from "./models/Student.js";
import Book from "./models/Book.js";
import Card from "./models/Card.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


// operations on books 

app.post('/book/add-book', async (req, res) => {
    console.log(req.body);

    const bookId = req.body.bookId;
    const name = req.body.name;
    const category = req.body.category;
    const author = req.body.author;

    await Book.insertMany([{
        bookId: bookId, name: name, category: category, author: author
    }]).then((result) => {
        res.json({ success: true, msg: "inserted successfull", result: result })
    }).catch((err) => {
        res.json({ success: false, msg: "Error occured" })
    })
})

// search api, search books through user query, book id, book name, category, author
app.get('/book/search', async (req, res) => {
    console.log(req.body);

    const query = req.body.query;

    await Book.find({
        "$or": [
            { name: { $regex: query } },
            { author: { $regex: query } },
            { category: { $regex: query } }
        ]
    }).then((result) => {
        res.json({ success: true, result: result });
    }).catch((err) => {
        res.json({ success: false, msg: "Books not found", result: err });
    })

})

// update book details using book id
app.put('/book/update', async (req, res) => {
    console.log(req.body);

    const bookId = req.body.bookId;
    const name = req.body.name;
    const author = req.body.author;
    const category = req.body.author;

    if (await Book.findOne({ bookId: bookId })) {
        await Book.updateOne({ bookId: bookId }, { name, author, category }).then((result) => {
            res.json({ success: true, msg: "Updated", result: result })
        })
            .catch((err) => {
                res.json({ success: false, msg: "Error occured", result: err })
            })

    } else {
        res.json({ success: false, msg: "Book not found" });
    }
})

// delete book using book id
app.delete('/book/delete', async (req, res) => {
    console.log(req.body);

    const bookId = req.body.bookId;
    if (await Book.findOne({ bookId: bookId })) {
        await Book.deleteOne({ bookId: bookId }).then((result) => {
            res.json({ success: true, msg: "Book deleted", result: result });
        }).catch((err) => {
            res.json({ success: false, msg: "Error occured", result: error });
        })
    } else {
        res.json({ success: false, msg: "book not found" });
    }
})

// get all books
app.post('/book/get-books', async (req, res) => {
    console.log(req.body);

    await Book.find({}).then((result) => {
        res.json({ success: true, msg: "found books here", result: result });
    }).catch((err) => {
        res.json(err);
    })
});

// get single book by book id
app.get('/book/get-book', async (req, res) => {
    console.log(req.body);

    const bookId = req.body.bookId;

    await Book.findOne({ bookId: bookId }).then((result) => {
        res.json({ success: true, msg: "found a book", result: result });
    }).catch((err) => {
        res.json({ success: false, msg: "Book not found" })
    })
})

// operations on student by admin

// get all student
app.post('/admin/get-students', async (req, res) => {
    console.log(req.body);
    await Student.find({}).then((result) => {
        res.json({ success: true, msg: "student found", result: result });
    }).catch((err) => {
        res.jons({ success: false, msg: "failed to get students", result: err });
    })
})

// get single student using student enrollnoment
app.post('/admin/get-student', async (req, res) => {
    console.log(req.body);

    const enrollno = req.body.enrollno;

    await Student.findOne({enrollno: enrollno}).then((result)=>{ 
        res.json({success: true, msg: "we got a student", result: result})
    }).catch((err)=>{
        res.json({success: false, msg: "error occured", result: err});
    })
})

app.post('/admin/add-student', async (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const enrollno = req.body.enrollno;
    const password = req.body.password;

    await Student.insertMany([{ name: name, enrollno: enrollno, password: password }]).then((result) => {
        res.json({ success: true, msg: "student registered", result: result });
    }).catch((err) => {
        res.json({ success: false, msg: "error occured", result: err });
    })
})

// card operations

// generate new card
app.post('/admin/generate-card', async (req, res) => {
    console.log(req.body);

    let cardNo = req.body.cardNo;
    let enrollno = req.body.enrollno;

    let date = new Date().toLocaleDateString();

    await Student.updateOne({enrollno: enrollno}, {card: true}).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
    await Card.insertMany([{ cardNo: cardNo, enrollno: enrollno, date: date }]).then((result) => { 
        res.json({ success: true, msg: "card is created", newCard: result })
    }).catch((err) => {

        res.json({ success: false, msg: "card is not generated", error: err });
    })
})

// discard library card- card number or enrollment no
app.delete('/admin/remove-card', async (req, res) => {
    console.log(req.body);
    let cardNo = req.body.cardNo;
    if (await Card.findOne({ cardNo: cardNo })) {
        await Card.findOne({ cardNo: cardNo }).then((result)=>{
            const enrollno = result.enrollno;
            Student.updateOne({enrollno: enrollno}, {card: false});
        }).catch((err)=>{
            console.log(err);
        })
        await Card.deleteOne({ cardNo: cardNo }).then((result) => {
            res.json({ success: true, msg: "card is deleted", result: result });
        }).catch((err) => {
            res.json({ success: false, msg: "card is not deleted", result: err });
        })
    } else {
        res.json({ success: false, msg: "card not found" });
    }

})



app.get('/', async (req, res) => {

    // let newStudent = new Student({
    //     name : "Kamlesh",
    //     enrollno: "0610CS201060",
    //     password: "1234",
    // })

    // console.log(await newStudent.save());

    res.json({ success: true, msg: "Reply from server" });
});

app.post('/login', async (req, res) => {


    console.log(req.body);
    const type = req.body.type;

    if (type === 'student') {
        const enrollno = req.body.enrollno;
        const password = req.body.password;

        const user = await Student.findOne({ enrollno: enrollno, password: password }).select("-password");
        res.json({ success: true, msg: "found one user", user: user });
    }

    else if (type === 'admin') {
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admin.findOne({ email: email, password: password }).select("-password");
        if (admin) {
            let books = await getAllBooks();
            console.log(books);
            res.json({ success: true, msg: "found one user", user: admin, books: books });
        }
        else {
            res.json({ success: true, msg: "Admin not found" });
        }
    }
    else {
        res.json({ success: true, msg: "user type not specified" });
    }
});

app.post('/register', async (req, res) => {
    const admin = req.body;

    if ((req.body)) {
        const name = admin.name;
        const email = admin.email;
        const password = admin.password;

        console.log(admin);

        if (name === undefined || email === undefined || password === undefined) {
            res.json({ success: false, msg: "error occurred, may be some fields are missing, or db error" });
        }

        await Admin.insertMany({ name: name, email: email, password: password }).then((success) => {
            res.json({ success: true, msg: success })
        })
            .catch((err) => {
                res.json({ success: false, msg: err });
            })
    } else {
        res.json({ success: false, msg: "body missing" });
    }
});

app.listen(8000, () => {
    console.log('server has been started on port 8000');
    connectDB();
});
