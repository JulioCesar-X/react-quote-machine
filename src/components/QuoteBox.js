import React, { useEffect } from "react";
import useFetchQuote from "../hooks/useFetchQuote";
import useFetchColor from "../hooks/useFetchColor";

const QuoteBox = () => {
  const { quote, author, authorPhoto, fetchNewQuote } = useFetchQuote();
  const { color, fetchNewColor } = useFetchColor();

  useEffect(() => {
    document.body.style.backgroundColor = color;
    document.body.style.transition = "background-color 0.5s ease";
  }, [color]);

  const handleNewQuote = async () => {
    await fetchNewQuote();
    await fetchNewColor();
  };

  return (
    <div
      id="quote-box"
      style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "15px",
        maxWidth: "600px",
        margin: "50px auto",
        textAlign: "center",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
        color: color,
      }}
    >
      {/* Foto do autor */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          margin: "0 auto 20px",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {authorPhoto ? (
          <img
            src={authorPhoto}
            alt={`Photo of ${author}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <i
            className="fas fa-user"
            style={{
              fontSize: "50px",
              color: "#ccc",
            }}
          ></i>
        )}
      </div>

      {/* Texto da Citação */}
      <div
        id="text"
        style={{
          fontSize: "1.5em",
          fontWeight: "500",
          lineHeight: "1.6",
          marginBottom: "20px",
        }}
      >
        <i
          className="fas fa-quote-left"
          style={{ marginRight: "10px", color: color }}
        ></i>
        {quote}
        <i
          className="fas fa-quote-right"
          style={{ marginLeft: "10px", color: color }}
        ></i>
      </div>

      {/* Nome do Autor */}
      <div
        id="author"
        style={{
          fontSize: "1.2em",
          fontStyle: "italic",
          marginTop: "10px",
        }}
      >
        - {author}
      </div>

      {/* Botões */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {/* Botão de Tweet */}
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `"${quote}" - ${author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: color,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "12px",
            textDecoration: "none",
            fontSize: "1.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fab fa-twitter"></i>
        </a>

        {/* Botão de Nova Citação */}
        <button
          id="new-quote"
          onClick={handleNewQuote}
          style={{
            backgroundColor: color,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "12px",
            fontSize: "1.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;