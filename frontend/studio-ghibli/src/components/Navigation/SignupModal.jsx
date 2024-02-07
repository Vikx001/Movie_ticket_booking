//SignUpModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
const SignUpModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Full Name"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
        <Button onClick={handleClose} style={{ marginTop: 20 }}>
          Cancel
        </Button>
        <Button onClick={handleClose} style={{ marginLeft: 10, marginTop: 20 }}>
          Sign Up
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default SignUpModal;
