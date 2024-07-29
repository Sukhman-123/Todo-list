const todoModel = require("../models/todo");
const { v4: uuidv4 } = require("uuid");

const addTodo = async (req, res) => {
  try {
    const newTodo = new todoModel({
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      completed: false,
    });
    await newTodo.save();
    res.status(201).json({ newTodo });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const todoController = {
  addTodo,
};

module.exports = todoController;
