import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Button from "@mui/material/Button"; // Adjusted for demonstration
import LoginModal from "./LoginModal"; // Adjust the import path as needed
import SignUpModal from "./SignupModal";

// Custom components, assuming these paths are correct
import MenuButton from "../../share/UIElements/MenuButton/MenuButtom"; // Ensure the component name and import path are correct
import RightTooltip from "./RightTooltip/RightTooltip";
import SearchBar from "./SearchBar/SearchBar";
import CartTooltip from "./CartTooltip/CartTooltip";
import Categories from "./Categories/Categories";

const Navigation = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false); // New state for the Sign Up modal

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleSignUpClick = () => {
    setSignUpModalOpen(true); // Function to open the Sign Up modal
  };

  const handleSignUpModalClose = () => {
    setSignUpModalOpen(false); // Function to close the Sign Up modal
  };

  // Styled tooltip wrappers
  const RightTooltipWithStyle = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "transparent",
      color: theme.palette.grey[900],
      borderRadius: 0,
      padding: 0,
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "background.paper",
          height: "7.2rem",
          px: "2.4rem",
          boxShadow: "0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)",
        }}
      >
        <Toolbar disableGutters sx={{ my: "auto", gap: 1 }}>
          <Box
            sx={{
              bgcolor: "#000000", // Use theme's primary color
              color: "white", // Text color
              fontWeight: "bold",
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px", // Rounded corners
              width: "200px", // Fixed width
              height: "100px", // Fixed height
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              "&:hover": {
                // Hover effect
                backgroundColor: "primary.dark", // Darken on hover
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Larger shadow on hover
              },
              userSelect: "none", // Prevent text selection
              transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
              cursor: "pointer", // Change cursor to indicate interactivity
            }}
          >
            Studio Ghibli
          </Box>

          <MenuButton>
            <RightTooltipWithStyle
              title={<Categories />}
              placement="bottom-start"
            >
              <span>Categories</span>
            </RightTooltipWithStyle>
          </MenuButton>
          <Box sx={{ flexGrow: 1 }}>
            <SearchBar />
          </Box>
          <MenuButton>
            <RightTooltipWithStyle
              title={<CartTooltip />}
              placement="bottom-end"
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
            </RightTooltipWithStyle>
          </MenuButton>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: "10px" }}
            onClick={handleLoginClick}
            sx={{
              border: "1px solid #000000",
              color: "#000000",
              fontSize: "1.4rem",
              borderRadius: 0,
              textTransform: "none",
            }}
          >
            Login
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSignUpClick}
            sx={{
              border: "1px solid #000000",
              color: "#ffffff",
              fontSize: "1.4rem",
              borderRadius: 0,
              textTransform: "none",
              bgcolor: "#000000",
            }}
          >
            Sign Up
          </Button>
          <Button sx={{ color: "white", height: "4rem", width: "4rem" }}>
            <LanguageIcon sx={{ fontSize: "2rem" }} />
          </Button>
        </Toolbar>
      </AppBar>
      <LoginModal open={loginModalOpen} handleClose={handleLoginModalClose} />
      <SignUpModal
        open={signUpModalOpen}
        handleClose={handleSignUpModalClose}
      />
    </Box>
  );
};

export default Navigation;
