const Authors = require("../models/Authors");
const router = require('express').Router();
const Livros = require("../models/Livros")

//REGISTER
router.post("/register", async (req, res) => {
    const newAuthor = new Authors(req.body);
    try {
        const author = await newAuthor.save();
        res.status(200).json(author)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE AUTHOR
router.put("/:id", async (req, res) => {
    try {
        const author = await Authors.findById(req.params.id);
        if (author.userId === req.body.userId) {
            await author.updateOne({ $set: req.body });
            res.status(200).json(`The author ${author.nameAuthor} has been updated`)
        } else {
            res.status(403).json("You can't update only author")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE AUTHOR
router.delete("/:id", async (req, res) => {
    try {
        const author = await Authors.findById(req.params.id);
        if (author.userId === req.body.userId) {
            await author.deleteOne();
            res.status(200).json(`The author ${author.nameAuthor} has been deleted`)
        } else {
            res.status(403).json("You can't delete only author")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET AUTHOR
router.get("/:id", async (req, res)=> {
    try {
        const author = await Authors.findById(req.params.id)
        const { _id, ...others} = author._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET BOOKS A AUTHOR
router.get("/:id/book", async (req, res) => {
    try {
        const author = await Authors.findById(req.params.id);
        const book = await Livros.find({authorId: req.params.id})
        namebook = await book.map((a) => namebook = a.bookname)
        res.status(200).json(`The author ${author.nameAuthor} to write ${namebook}`)
    } catch (err) {
        res.status(500).json(err)      
    }
})

//GET ALL AUTHORS
router.get("/authors/all", async (req, res) => {
    try {
        const author = await Authors.find()
        res.status(200).json(author)
    } catch (err){
        res.status(500).json(err)
    }
})


module.exports = router