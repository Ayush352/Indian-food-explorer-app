
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { Box, CircularProgress, MenuItem, FormControl, InputLabel, Select, TextField, Grid, Button } from "@mui/material";
import styles from './DishList.module.css';


const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diet, setDiet] = useState("");
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [flavor, setFlavor] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/dishes").then((res) => {
      // Add ID field for DataGrid
      const withId = res.data.map((dish, index) => ({ id: index, ...dish }));
      setDishes(withId);
      setFiltered(withId);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let data = dishes;
    if (diet) data = data.filter(d => typeof d.diet === 'string' && d.diet.toLowerCase() === diet);
    if (state) data = data.filter(d => typeof d.state === 'string' && d.state.toLowerCase() === state);
    if (region) data = data.filter(d => typeof d.region === 'string' && d.region.toLowerCase() === region);
    if (flavor) data = data.filter(d => typeof d.flavor_profile === 'string' && d.flavor_profile.toLowerCase() === flavor);
    if (search) data = data.filter(d => d.name && d.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(data);
  }, [diet, state, region, flavor, search, dishes]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    {
      field: "name",
      headerName: "Dish Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/dish/${params.row.id}`} className={styles.link}>
          {params.value}
        </Link>
      ),
    },
    { field: "diet", headerName: "Diet", flex: 0.5 },
    { field: "prep_time", headerName: "Prep Time (mins)", type: "number", flex: 0.5 },
    { field: "cook_time", headerName: "Cook Time (mins)", type: "number", flex: 0.5 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "region", headerName: "Region", flex: 0.5 },
  ];

  // Get unique values for filters
  const diets = Array.from(new Set(dishes.map(d => typeof d.diet === 'string' ? d.diet.toLowerCase() : '').filter(Boolean)));
  const states = Array.from(new Set(dishes.map(d => typeof d.state === 'string' ? d.state.toLowerCase() : '').filter(Boolean)));
  const regions = Array.from(new Set(dishes.map(d => typeof d.region === 'string' ? d.region.toLowerCase() : '').filter(Boolean)));
  const flavors = Array.from(new Set(dishes.map(d => typeof d.flavor_profile === 'string' ? d.flavor_profile.toLowerCase() : '').filter(Boolean)));

  const handleClear = () => {
    setDiet("");
    setState("");
    setRegion("");
    setFlavor("");
    setSearch("");
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ mb: 2, p: 2, background: "#f5f6fa", borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Diet</InputLabel>
              <Select value={diet} label="Diet" onChange={e => setDiet(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {diets.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 160 }}>
              <InputLabel>State</InputLabel>
              <Select value={state} label="State" onChange={e => setState(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {states.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Region</InputLabel>
              <Select value={region} label="Region" onChange={e => setRegion(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {regions.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Flavor</InputLabel>
              <Select value={flavor} label="Flavor" onChange={e => setFlavor(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {flavors.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              size="small"
              label="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>Clear</Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: 600, width: "100%" }}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No dishes found matching your filters.</div>
        ) : (
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableSelectionOnClick
          />
        )}
      </Box>
    </Box>
  );
};

export default DishList;
