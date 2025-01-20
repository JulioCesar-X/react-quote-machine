import { useState } from 'react';

const useFetchColor = () => {
  const [color, setColor] = useState('#333'); // Estado inicial com uma cor escura padrão

  // Valida se a cor NÃO é branca, bege ou cinza claro
  const isValidColor = (hex) => {
    // Converte HEX para valores RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Regras para eliminar branco, bege ou cinzas claros
    const isWhiteOrBeige = r > 200 && g > 200 && b > 200; // Tons próximos ao branco ou bege
    const isGray = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 150; // Cinzas claros

    // Retorna true apenas se a cor não for indesejada
    return !(isWhiteOrBeige || isGray);
  };

  const fetchNewColor = async () => {
    try {
      let randomColor;
      do {
        const response = await fetch(
          'https://random-data-api.com/api/color/random_color'
        );
        if (!response.ok) throw new Error('Error fetching color');
        const data = await response.json();
        randomColor = data.hex_value; // Obtém a cor hexadecimal gerada
      } while (!isValidColor(randomColor)); // Continua gerando até que a cor seja válida

      setColor(randomColor); // Atualiza o estado com a cor válida
    } catch (error) {
      console.error('Failed to fetch random color:', error);
      setColor('#333'); // Fallback para uma cor escura padrão
    }
  };

  return { color, fetchNewColor }; // Retorna a cor e a função para buscar novas cores
};

export default useFetchColor;