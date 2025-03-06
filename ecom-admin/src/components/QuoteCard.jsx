const QuoteCard = ({ quote }) => {
  return (
    <div className="quote-card">
      <blockquote>"{quote.quote}"</blockquote>
      <p>- {quote.author}</p>
    </div>
  );
};

export default QuoteCard;