import { useState } from 'react';

// Cache para evitar múltiplas chamadas
const cache = {};

const useFetchAuthorPhoto = () => {
  const [authorPhoto, setAuthorPhoto] = useState('');

  const fetchAuthorPhoto = async (authorName) => {
    // Verificar se já existe no cache
    if (cache[authorName]) {
      setAuthorPhoto(cache[authorName]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(authorName)}&format=json&pretty=1`
      );
      if (!response.ok) throw new Error('Error fetching author photo');
      const data = await response.json();

      // Tenta utilizar o campo Image
      if (data.Image) {
        const imageUrl = `https://duckduckgo.com${data.Image}`;
        cache[authorName] = imageUrl; // Adiciona ao cache
        setAuthorPhoto(imageUrl);
        return;
      }

      // Procura imagens nos RelatedTopics
      const relatedTopicWithImage = data.RelatedTopics.find(
        (topic) => topic.Icon && topic.Icon.URL
      );

      if (relatedTopicWithImage) {
        const imageUrl = `https://duckduckgo.com${relatedTopicWithImage.Icon.URL}`;
        cache[authorName] = imageUrl; // Adiciona ao cache
        setAuthorPhoto(imageUrl);
        return;
      }

      // Fallback: caso nenhuma imagem seja encontrada
      const fallbackUrl = 'https://img.icons8.com/ios-filled/100/000000/user.png';
      cache[authorName] = fallbackUrl;
      setAuthorPhoto(fallbackUrl);
    } catch (error) {
      console.error('Failed to fetch author photo:', error);
      const fallbackUrl = 'https://img.icons8.com/ios-filled/100/000000/user.png';
      cache[authorName] = fallbackUrl;
      setAuthorPhoto(fallbackUrl);
    }
  };

  return { authorPhoto, fetchAuthorPhoto };
};

export default useFetchAuthorPhoto;