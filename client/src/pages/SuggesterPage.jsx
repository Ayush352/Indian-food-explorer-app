import React, { useState } from "react";
import api from "../utils/api";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import styles from './SuggesterPage.module.css';
import { useNavigate } from "react-router-dom";

const commonIngredients = [
  "Rice flour", "Coconut", "Jaggery", "Milk", "Ghee",
  "Banana", "Potato", "Sugar", "Flour", "Lentils", "Onion", "Tomato"
];

const SuggesterPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSuggest = async () => {
    const res = await api.post("/dishes/suggest", { ingredients });
    // Add an "id" field (index from backend list)
    const withIds = res.data.map((dish) => ({
      ...dish,
      id: dish.id || dish.index || dish._id || dish.name // fallback
    }));
    setResults(withIds);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        🍴 Dish Suggester
      </Typography>
      <Typography variant="body1" gutterBottom>
        Select the ingredients you have, and we’ll suggest dishes you can make.
      </Typography>

      {/* Multi-select dropdown */}
      <Autocomplete
        multiple
        options={commonIngredients}
        freeSolo
        value={ingredients}
        onChange={(event, newValue) => setIngredients(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Ingredients"
            placeholder="Type or pick ingredients..."
          />
        )}
        sx={{ mb: 2, width: "100%", maxWidth: 600 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSuggest}
        sx={{ mb: 3 }}
      >
        🔍 Suggest Dishes
      </Button>

      {/* Results */}
      <Grid container spacing={2} className={styles.resultsGrid}>
        {results.map((dish, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => navigate(`/dish/${dish.id}`)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {dish.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dish.state} • {dish.region}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Diet: {dish.diet}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuggesterPage;
