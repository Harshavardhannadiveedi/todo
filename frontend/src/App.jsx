import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./Components/SignupForm/Signup";
import LoginForm from "./Components/LoginForm/LoginForm";
import Todo from "./Components/Todo/TodoList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<Todo />} />
    </Routes>
  );
};

export default App;
