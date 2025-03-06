import { useState, useEffect } from "react";
import { Card, Spin, Typography, message } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/quotes");
      setQuotes(res.data.quotes);
    } catch (error) {
      message.error("Failed to fetch quotes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Inspirational Quotes</Title>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          justifyContent: "center",
        }}>
          {quotes.map((quote) => (
            <Card 
              key={quote.id} 
              hoverable
              style={{ 
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
                borderRadius: "8px",
                padding: "10px"
              }}
            >
              <Paragraph style={{ fontStyle: "italic", fontSize: "16px" }}>
                "{quote.quote}"
              </Paragraph>
              <Paragraph strong style={{ textAlign: "right", marginTop: "10px" }}>
                - {quote.author}
              </Paragraph>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotesPage;
