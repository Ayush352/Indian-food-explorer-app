import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import styles from './DishDetails.module.css';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PublicIcon from "@mui/icons-material/Public";

const DishDetails = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    api.get(`/dishes/${id}`).then((res) => setDish(res.data));
  }, [id]);

  if (!dish) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card} sx={{ boxShadow: 4 }}>
        <CardContent>
          {/* Dish Name */}
          <Typography variant="h4" component="div" gutterBottom className={styles.title}>
            {dish.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Ingredients */}
          <Typography variant="h6" gutterBottom>Ingredients</Typography>
          <div className={styles.chips}>
            {dish.ingredients.split(",").map((ing, i) => (
              <Chip key={i} label={ing.trim()} color="primary" variant="outlined" />
            ))}
          </div>

          {/* Meta Info */}
          <Grid container spacing={2} className={styles.metaGrid}>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" className={styles.metaItem}>
                <RestaurantIcon color="secondary" /> {dish.diet}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" className={styles.metaItem}>
                <AccessTimeIcon color="secondary" /> Prep: {dish.prep_time} mins
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" className={styles.metaItem}>
                <AccessTimeIcon color="secondary" /> Cook: {dish.cook_time} mins
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1" className={styles.metaItem}>
                <PublicIcon color="secondary" /> {dish.region || "Unknown"}
              </Typography>
            </Grid>
          </Grid>

          {/* Flavor, Course, State */}
          <Typography variant="body1" className={styles.metaText}><b>Flavor:</b> {dish.flavor_profile}</Typography>
          <Typography variant="body1" className={styles.metaText}><b>Course:</b> {dish.course}</Typography>
          <Typography variant="body1" className={styles.metaText}><b>State:</b> {dish.state}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DishDetails;
