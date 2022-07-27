const Livros = require('../models/Livros');
const router = require('express').Router();
//REGISTER BOOK
router.post("/register", async (req, res) =>{
    try{
        const newBook = new Livros({
            bookname: req.body.bookname,
            category: req.body.category,
            authorId: req.body.authorId,
            pages: req.body.pages,
            company: req.body.company,
            status: req.body.status,
        });
        const book = await newBook.save();
        res.status(200).json(book);
    }catch(err){
        res.status(500).json(err)
    }
});


//UPDATE BOOK
router.put("/:id", async (req, res)=>{
    try {
        const book = await Livros.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Book has been updated")
    } catch (err) {
        return res.status(500).json(err)
    }
});

//DELETE BOOK
router.delete("/:id", async (req, res)=>{
    try {
        const book = await Livros.findByIdAndDelete(req.params.id)
        res.status(200).json(`The book '${book.bookname}' has been deleted`)
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET A BOOK
router.get("/:id", async (req, res) =>{
    try {
        const book = await Livros.findById(req.params.id);
        const { _id, ...others} = book._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
