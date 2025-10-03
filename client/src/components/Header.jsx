import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Autocomplete, TextField, Box, Button } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event, value) => {

    if (value.length > 1) {
      try {
        const res = await api.get(`/dishes?name=${value}`);
        
        const withIds = res.data.map((dish, index) => ({ id: dish.id ?? index, label: dish.name }));
        setOptions(withIds);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (event, value) => {
    if (value && value.id !== undefined) {
      navigate(`/dish/${value.id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>

  <Typography variant="h6" className={styles.title} onClick={() => navigate("/home")}> 
          🍛 Indian Food Explorer
        </Typography>

        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
          <Box className={styles.searchBox}>
          <Autocomplete
            freeSolo
            options={options}
            onInputChange={handleSearch}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search by dish"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
                }}
              />
            )}
          />
          </Box>
          <div className={styles.actions}>
            <Button className={styles.logoutBtn} onClick={handleLogout} startIcon={<ExitToAppIcon />}>Logout</Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
