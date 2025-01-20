import { useState, useEffect } from 'react';

const useFetchQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchNewQuote = async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      if (!response.ok) throw new Error('Error fetching quote');
      const data = await response.json();

      
      const randomQuote =
        data.quotes[Math.floor(Math.random() * data.quotes.length)];
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
    } catch (error) {
      console.error(error);
      setQuote('Oops! Could not fetch a quote.');
      setAuthor('Unknown');
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return { quote, author, fetchNewQuote };
};

export default useFetchQuote;