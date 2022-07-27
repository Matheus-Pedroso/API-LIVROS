const router = require("express").Router()
const Livros = require("../models/Livros")
const Client = require("../models/Client")
const Rent = require("../models/RentBook")

//NEW RENT
router.post("/new", async (req, res)=> {
    const newRent = new Rent({
        clientId: req.body.clientId,
        bookId: req.body.bookId,
        rentedDays: req.body.rentedDays,
        devolveDays: req.body.devolveDays,
        status: req.body.status
    })
    try {
        const rent = await Rent.findOne({where: {bookId: req.body.bookId}})
        if (rent) {
            res.status(403).json("Rented Book or Book not exists! Wait for the return date.")
        } else {
            const savedRent = await newRent.save();

            res.status(200).json(savedRent)
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})
//UPDATE RENT
router.put("/:id", async (req, res) => {
    if (req.body.clienteId === req.params.clienteId) {
        try {
            const rent = await Rent.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Rent has been updated")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else  {
        return res.status(403).json("You can't update rent")
    }
})
//DELETE RENT
router.delete("/:id", async (req, res) => {
    try {
        const rent = await Rent.findByIdAndDelete(req.params.id)
        res.status(200).json("Rent has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET A RENT
router.get("/:id", async (req, res) => {
    try {
        const rent = await Rent.findById(req.params.id);
        res.status(200).json(rent)
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET ALL RENT
router.get("/rents/all", async (req, res) => {
    try {
        const rent = await Rent.find()
        res.status(200).json(rent)
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET BOOK NOT RENTED
router.get("/noRents/all", async (req, res) => {
    try {
        const rent = await Rent.find()
        const book = await Livros.find()
        const newArr = book.filter(prop => {
            const result = rent.find(a => prop.id !== a.bookId)
            return result
            
        })
        namebook = newArr.map((a) => namebook = a.bookname)
        res.status(200).json(`Os livros não alugados são ${namebook }`)
        
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router