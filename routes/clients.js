const router = require("express").Router();
const Client = require("../models/Client")

//REGISTER 
router.post("/register", async (req, res) =>{
    const newClient = new Client({
        name: req.body.name,
        address: req.body.address,
        number: req.body.number
    });
    try {
        const saveClient = await newClient.save();
        res.status(200).json(saveClient)
    } catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE 
router.put("/:id", async (req, res)=>{
    try {
        const client = await Client.findById(req.params.id);
        if (client.clientId === req.body.clientId) {
            await client.updateOne({ $set: req.body});
            res.status(200).json(`The client ${client.name} has been updated`)
        } else {
            res.status(403).json("You can't update only client")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}),
//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.clientId === req.params.clientId) {
        try {
            const client = await Client.findByIdAndDelete(req.params.id);
            res.status(200).json("Client has been deleted")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can't deleted only client")
    }
})
//GET CLIENT
router.get("/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).json(client)
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET ALL CLIENT
router.get("/clients/all", async (req, res) => {
    try {
        const client = await Client.find();
        res.status(200).json(client)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router