import { useEffect, useState } from "react";
import { Card, Spin, Typography, message } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/recipes");
      setRecipes(res.data.recipes);
    } catch (error) {
      message.error("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
         Recipes 
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              title={recipe.name}
              hoverable
              cover={<img alt={recipe.name} src={recipe.image} style={{ height: "200px", objectFit: "cover" }} />}
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <Paragraph strong>Ingredients:</Paragraph>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
