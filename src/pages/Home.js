import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (query) => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    setRecipes(res.data.meals || []);
  };

  return (
    <div>
      <h2 className="mb-4">Find Delicious Recipes</h2>
      <SearchBar onSearch={fetchRecipes} />

      <div className="row">
        {recipes.length === 0 ? (
          <p>No recipes found. Try searching!</p>
        ) : (
          recipes.map((recipe) => (
            <div className="col-md-4 mb-3" key={recipe.idMeal}>
              <div className="card">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.strMeal}</h5>
                  <p className="card-text">{recipe.strArea} Cuisine</p>
                  <Link to={`/recipe/${recipe.idMeal}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
