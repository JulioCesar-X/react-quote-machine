import React, { useEffect } from 'react';
import useFetchQuote from '../hooks/useFetchQuote'; // Hook para buscar citações
import useFetchColor from '../hooks/useFetchColor'; // Hook para buscar cores

const QuoteBox = () => {
  const { quote, author, fetchNewQuote } = useFetchQuote(); // Hook para citações
  const { color, fetchNewColor } = useFetchColor(); // Hook para cores

  // Atualiza a cor de fundo do body dinamicamente
  useEffect(() => {
    document.body.style.backgroundColor = color; // Define a cor gerada como fundo do body
    document.body.style.transition = 'background-color 0.5s ease'; // Transição suave
  }, [color]); // Executa sempre que a cor mudar

  // Função chamada ao gerar uma nova citação
  const handleNewQuote = async () => {
    await fetchNewQuote(); // Obtém uma nova citação
    await fetchNewColor(); // Atualiza a cor de fundo
  };

  return (
    <div
      id="quote-box"
      style={{
        backgroundColor: 'rgb(255, 255, 255)', // Fundo fixo do box
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '50px auto',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Sombra para destaque
        transition: 'background-color 0.5s ease', // Transição suave
      }}
    >
      <div
        id="text"
        style={{
          fontSize: '1.75em',
          marginBottom: '20px',
          color: color, // Cor dinâmica do texto
          fontWeight: '500',
          lineHeight: '1.5',
        }}
      >
        "{quote}" {/* Exibe a citação */}
      </div>
      <div
        id="author"
        style={{
          marginBottom: '20px',
          fontStyle: 'italic',
          fontSize: '1.2em',
          color: color, // Cor dinâmica do autor
        }}
      >
        - {author} {/* Exibe o autor */}
      </div>
      <button
        id="new-quote"
        onClick={handleNewQuote}
        style={{
          backgroundColor: color, // Botão com a cor dinâmica
          color: '#fff',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
      >
        New Quote {/* Botão para nova citação */}
      </button>
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
          textDecoration: 'none',
          marginTop: '20px',
          padding: '12px 25px',
          borderRadius: '5px',
          display: 'inline-block',
          fontSize: '1em',
          fontWeight: 'bold',
          transition: 'color 0.3s ease',
        }}
      >
        Tweet {/* Link para compartilhar no Twitter */}
      </a>
    </div>
  );
};

export default QuoteBox;