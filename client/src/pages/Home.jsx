import React from "react";
import DishList from "../components/DishList";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mb: 2 }}
        onClick={() => navigate("/suggester")}
      >
        🍴 Dish Suggester
      </Button>
      <DishList />
    </Box>
  );
};

export default Home;