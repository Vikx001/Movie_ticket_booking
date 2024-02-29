// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
//   Snackbar,
// } from "@mui/material";

// const LoginModal = ({ open, handleClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState(""); // New state for snackbar message

//   const loginUser = async (email, password) => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/api/users/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Login failed");
//       }
//       const data = await response.json();
//       console.log("Login successful:", data);
//       setLoggedIn(true);
//       handleClose();
//       setSnackbarMessage("You are logged in!"); 
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     await loginUser(email, password);
//     setEmail(""); 
//     setPassword(""); 
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <div>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Login</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="email"
//               label="Email Address"
//               type="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               id="password"
//               label="Password"
//               type="password"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div
//               style={{
//                 marginTop: 20,
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <Button onClick={handleClose}>Cancel</Button>
//               <Button type="submit" style={{ marginLeft: 10 }}>
//                 Login
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage} 
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
//         transitionDuration={500} 
//       />
//     </div>
//   );
// };

// export default LoginModal;
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Snackbar } from "@mui/material";

const LoginModal = ({ open, handleClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log("Login successful:", data);
      handleClose();
      setSnackbarMessage("You are logged in!");
      setSnackbarOpen(true);
      onLoginSuccess(); // Notify parent component about successful login
    } catch (error) {
      console.error("Error during login:", error);
      setSnackbarMessage("Login failed. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(email, password);
    setEmail("");
    setPassword("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" style={{ marginLeft: 10 }}>
                Login
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transitionDuration={500}
      />
    </div>
  );
};

export default LoginModal;
