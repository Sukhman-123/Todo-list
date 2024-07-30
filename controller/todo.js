const todoModel = require("../models/todo");
const { v4: uuidv4 } = require("uuid");

const getTodos = async (req, res) => {
  try {
    const {
      search,
      completed,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "asc",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;
    const todos = await todoModel
      .find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(Number(limit));

    const totalTodos = await todoModel.countDocuments(query);
    const totalPages = Math.ceil(totalTodos / limit);

    res.json({
      totalTodos,
      totalPages,
      currentPage: Number(page),
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const existingTodo = await todoModel.findOne({ title });
    if (existingTodo) {
      return res
        .status(400)
        .json({ message: "A Todo with this title already exists" });
    }
    const newTodo = new todoModel({
      id: uuidv4(),
      title,
      description,
      completed: false,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = req.body;
    const todo = await todoModel.findOneAndUpdate({ id }, updatedTodo, {
      new: true,
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoModel.findOneAndDelete({ id });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsDone = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findOneAndUpdate(
      { id },
      { completed: true },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getTodoById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await todoModel.findOne({ id });
//     if (!todo) {
//       return res.status(404).json({ message: "Todo not found" });
//     }
//     res.json(todo);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getCompletedTodos = async (req, res) => {
//   try {
//     const todos = await todoModel.find({ completed: true });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getIncompleteTodos = async (req, res) => {
//   try {
//     const todos = await todoModel({ completed: false });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const searchTodos = async (req, res) => {
//   try {
//     const { query } = req.query;

//     const todos = await todoModel.find({
//       $or: [
//         { title: new RegExp(query, "i") },
//         { description: new RegExp(query, "i") },
//       ],
//     });

//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const countTodos = async (req, res) => {
//   try {
//     const total = await todoModel.countDocuments();
//     const completed = await todoModel.countDocuments({ completed: true });
//     const incomplete = await todoModel.countDocuments({ completed: false });
//     res.json({ total, completed, incomplete });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const todoController = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  markAsDone,
  // getTodoById,
  // getCompletedTodos,
  // getIncompleteTodos,
  // searchTodos,
  // countTodos,
};

module.exports = todoController;
