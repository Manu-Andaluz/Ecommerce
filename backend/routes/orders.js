const { Order } = require("../models/order");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require('moment')
const router = require("express").Router();

//CREATE

// createOrder is fired by stripe webhook
// example endpoint

router.post("/", auth, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL ORDERS

router.get("/", isAdmin, async (req, res) => {
  const query = req.body.newOnes

  try {
    const orders = query
      ? await Order.find().sort({ "createdAt": -1 }).limit(4)
      : await Order.find().sort({ "createdAt": -1 })

    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL ORDERS (NUMBER)

router.get("/number", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).send(orders.length.toLocaleString());
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET STATS

router.get("/stats", isAdmin, async (req, res) => {
  const previusMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const orders = await Order.aggregate([
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
    ]);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL INCOME

router.get("/allTimeIncome", isAdmin, async (req, res) => {

  try {
    const orders = await Order.aggregate([
      {
        $project: {
          sales: "$total"
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }
        }
      }
    ]);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", isAdmin, async (req, res) => {
  const previusMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previusMonth) } }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total"
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }
        }
      }
    ]);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ONE WEEK INCOME

router.get("/daysIncome", isAdmin, async (req, res) => {
  const lastSevenDays = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(lastSevenDays) } }
      },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total"
        }
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" }
        }
      }
    ]);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE ORDER

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).send("User not found... ");

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    res.status(200).send(deletedOrder);

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
