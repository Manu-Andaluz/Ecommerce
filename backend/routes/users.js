const { User } = require('../models/user')
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require('moment')

const router = require('express').Router()

//GET ALL USERS

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

//GET ALL USERS (NUMBER)

router.get("/number", isAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users.length.toLocaleString());
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/stats', isAdmin, async (req, res) => {
    const previusMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss")

    try {
        const users = await User.aggregate([
            {
                $match: { createdAt: { $gte: new Date(previusMonth) } }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])

        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

// DELETE USER

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).send("User not found... ");

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.status(200).send(deletedUser);

    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router