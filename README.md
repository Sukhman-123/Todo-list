# Todo List Application

## Overview

This is a simple Todo List application built with Node.js and Express.js. The application allows you to manage a list of todos with functionalities to add, update, delete, and mark todos as completed.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

- `GET /api/todos`: Retrieve the list of todos.
- `POST /api/todos`: Add a new todo.
- `PUT /api/todos/:id`: Update an existing todo.
- `DELETE /api/todos/:id`: Delete a todo.
- `PATCH /api/todos/:id/done`: Mark a todo as completed.

## Implementation Details

- The todos are stored in a JSON file located in the `db` folder.
- The application uses the Express.js framework to handle API routes.
- The application is designed to be scalable and easily adaptable for future enhancements.
