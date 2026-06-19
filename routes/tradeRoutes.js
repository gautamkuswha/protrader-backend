const express = require("express");

const {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
} = require("../controllers/tradeController");

const router = express.Router();

router.route("/")
  .post(createTrade)
  .get(getTrades);

router.route("/:id")
  .get(getTradeById)
  .put(updateTrade)
  .delete(deleteTrade);

module.exports = router;