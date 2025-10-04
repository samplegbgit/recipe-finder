import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setRecipe(res.data.meals[0]);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="card-img-top" />
      <div className="card-body">
        <h3>{recipe.strMeal}</h3>
        <p><strong>Cuisine:</strong> {recipe.strArea}</p>
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <h5>Instructions:</h5>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
}
