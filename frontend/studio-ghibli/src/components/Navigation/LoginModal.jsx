import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
const LoginModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_GATEWAY}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log("Login successful:", data);
      handleClose();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(email, password);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" style={{ marginLeft: 10 }}>
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoginModal;
