import User from "../model/schema.js"; // Adjust the path as needed

// Fetch all todos for a specific user
export const getData = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Todos fetched successfully", todos: user.todos });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos", error });
    }
};

// Add a new todo for a specific user
export const addTodo = async (req, res) => {
    const { userId, data } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const newTodo = { data, completed: false }; // Default completed to false
        user.todos.push(newTodo); // Add new todo
        await user.save();

        // Get the newly added todo
        const addedTodo = user.todos[user.todos.length - 1];

        res.status(201).json({
            message: "Todo added successfully",
            todo: {
                id: addedTodo._id, // Return the todoId
                data: addedTodo.data,
                completed: addedTodo.completed,
            },
            todos: user.todos, // Optionally include the updated list
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to add todo", error });
    }
};

// Delete a todo by its ID for a specific user
export const deleteTodo = async (req, res) => {
    const { userId, todoId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.todos = user.todos.filter(todo => todo._id.toString() !== todoId);
        await user.save();

        res.status(200).json({ message: "Todo deleted successfully", todos: user.todos });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error });
    }
};

// Edit a todo by its ID for a specific user
export const editTodo = async (req, res) => {
    const { userId, todoId } = req.params;
    const { data } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const todo = user.todos.find(todo => todo._id.toString() === todoId);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.data = data; // Update the data field
        await user.save();

        res.status(200).json({ message: "Todo updated successfully", todos: user.todos });
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error });
    }
};

// Mark a todo as completed by its ID
export const completeTodo = async (req, res) => {
    const { userId, todoId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const todo = user.todos.find(todo => todo._id.toString() === todoId);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.completed = true; // Mark as completed
        await user.save();

        res.status(200).json({ message: "Todo marked as completed", todos: user.todos });
    } catch (error) {
        res.status(500).json({ message: "Failed to complete todo", error });
    }
};
