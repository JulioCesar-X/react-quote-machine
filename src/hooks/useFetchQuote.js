import { useState, useEffect, useCallback } from 'react';
import useFetchAuthorPhoto from './useFetchAuthorPhoto'; // Hook para buscar a foto do autor

const useFetchQuote = () => {
  const [quote, setQuote] = useState(''); // Estado para a citação
  const [author, setAuthor] = useState(''); // Estado para o autor
  const { authorPhoto, fetchAuthorPhoto } = useFetchAuthorPhoto(); // Hook para a foto do autor

  // Função para buscar uma nova citação
  const fetchNewQuote = useCallback(async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      if (!response.ok) throw new Error('Error fetching quote');
      const data = await response.json();

      // Seleciona uma citação aleatória
      const randomQuote =
        data.quotes[Math.floor(Math.random() * data.quotes.length)];
      setQuote(randomQuote.quote); // Atualiza a citação
      setAuthor(randomQuote.author); // Atualiza o autor
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuote('Oops! Could not fetch a quote.');
      setAuthor('Unknown');
    }
  }, []);

  // Busca a foto do autor sempre que o autor mudar
  useEffect(() => {
    if (author) {
      fetchAuthorPhoto(author);
    }
  }, [author, fetchAuthorPhoto]);

  // Busca uma nova citação na inicialização
  useEffect(() => {
    fetchNewQuote();
  }, [fetchNewQuote]);

  return { quote, author, authorPhoto, fetchNewQuote };
};

export default useFetchQuote;