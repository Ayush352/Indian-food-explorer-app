import React, { useState } from "react";
import api from "../utils/api";
import styles from './DishSuggester.module.css';

const DishSuggester = () => {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);

  const addIngredient = () => {
    if (input && !ingredients.includes(input)) {
      setIngredients([...ingredients, input]);
      setInput("");
    }
  };

  const suggest = async () => {
    try {
      const res = await api.post("/dishes/suggest", { ingredients });
      setResults(res.data);
    } catch (err) {
      setResults([]);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Dish Suggester</h3>
      <div className={styles.inputRow}>
        <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter ingredient" />
        <button className={styles.button} onClick={addIngredient}>Add</button>
        <button className={styles.button} onClick={suggest}>Suggest Dishes</button>
      </div>
      <ul className={styles.list}>
        {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
      <h4>Possible Dishes:</h4>
      {results.length > 0 && (
        <ul className={styles.list}>
          {results.map((dish, i) => <li key={i}>{dish.name}</li>)}
        </ul>
      )}
    </div>
  );
};

export default DishSuggester;
