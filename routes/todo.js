const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo");

router.get("/", todoController.getTodos);
router.post("/add", todoController.addTodo);
router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.patch("/:id/done", todoController.markAsDone);
// router.get("/:id", todoController.getTodoById);
// router.get("/completed", todoController.getCompletedTodos);
// router.get("/incomplete", todoController.getIncompleteTodos);
// router.get("/search", todoController.searchTodos);
// router.get("/count", todoController.countTodos);

module.exports = router;
