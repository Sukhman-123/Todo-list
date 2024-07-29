const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo");

router.post("/add-todos", todoController.addTodo);

module.exports = router;
