import express from 'express';
import { signUpUser,logInUser } from '../controller/userController.js';
import { addTodo,getData ,deleteTodo, editTodo, completeTodo } from "../controller/todo.controller.js";

const router = express.Router();

router.post('/signupUser', signUpUser);  

router.post('/loginUser', logInUser);  

router.post('/getData', getData);

router.post("/add", addTodo); // Add a new todo

router.put("/:userId/:todoId", editTodo); // Edit a todo

router.patch("/:userId/:todoId/complete", completeTodo);

router.delete("/:userId/:todoId", deleteTodo); // Delete a todo 


export default router;