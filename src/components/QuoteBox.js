import React, { useEffect } from 'react';
import useFetchQuote from '../hooks/useFetchQuote'; // Hook para buscar citações
import useFetchColor from '../hooks/useFetchColor'; // Hook para cores dinâmicas

const QuoteBox = () => {
  const { quote, author, authorPhoto, fetchNewQuote } = useFetchQuote(); // Dados da citação e autor
  const { color, fetchNewColor } = useFetchColor(); // Cores dinâmicas

  useEffect(() => {
    document.body.style.backgroundColor = color; // Define o fundo do body
    document.body.style.transition = 'background-color 0.5s ease'; // Adiciona transição suave
  }, [color]);

  const handleNewQuote = async () => {
    await fetchNewQuote();
    await fetchNewColor();
  };

  return (
    <div
      id="quote-box"
      className="quote-box"
      style={{
        backgroundColor: '#fff',
        color: color,
        padding: '30px',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '50px auto',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Foto do autor */}
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          margin: '0 auto 20px',
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {authorPhoto ? (
          <img
            src={authorPhoto}
            alt={`Photo of ${author}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <img
            src="https://img.icons8.com/ios-filled/100/000000/user.png"
            alt="Default Placeholder"
            style={{
              width: '60%',
              height: '60%',
              opacity: 0.5,
            }}
          />
        )}
      </div>

      {/* Texto da Citação */}
      <div
        id="text"
        style={{
          fontSize: '1.75em',
          fontWeight: '500',
          lineHeight: '1.5',
          marginBottom: '20px',
          color: color,
        }}
      >
        <i style={{ color: color }}>“</i>
        {quote}
        <i style={{ color: color }}>”</i>
      </div>

      {/* Nome do Autor */}
      <div
        id="author"
        style={{
          fontSize: '1.2em',
          fontStyle: 'italic',
          marginTop: '10px',
          color: color,
        }}
      >
        - {author}
      </div>

      {/* Botões */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
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
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            fontSize: '1em',
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}
        >
          <i className="fab fa-twitter" aria-hidden="true"></i>
        </a>

        {/* Botão de Nova Citação */}
        <button
          id="new-quote"
          onClick={handleNewQuote}
          style={{
            backgroundColor: color,
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '1em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}
        >
          <i className="fas fa-sync-alt" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;