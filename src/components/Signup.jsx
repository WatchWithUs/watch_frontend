import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";

const API_URL = "http://localhost:5173";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/signup`, {
        name: username,
        email: email,
        password: password,
      });
      console.log(response.data);
      // Lógica adicional após o registro bem-sucedido, como redirecionar o usuário para a página de login
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
