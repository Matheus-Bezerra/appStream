// services/soundService.js
const axios = require('axios');
const cheerio = require('cheerio');

exports.searchingSounds = async (query) => {
  try {
    const response = await axios.get(`https://www.myinstants.com/search/?name=${query}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const sounds = [];

    $('.instant').each((index, element) => {
      const soundTitle = $(element).find('.instant-link').text();
      const soundUrl = 'https://www.myinstants.com' + $(element).find('a').attr('href');
      const soundPreview = $(element).find('audio').attr('src');

      sounds.push({
        title: soundTitle,
        url: soundUrl,
        preview: soundPreview,
      });
    });

    return sounds;
  } catch (error) {
    console.error(`Erro ao buscar sons->: ${error}`);
    throw new Error(`Erro ao buscar sons${error}`);
  }
};


exports.getTopSounds = async () => {
    try {
      // Faz a requisição para a página principal do Myinstants
      const response = await axios.get('https://www.myinstants.com/');
      const html = response.data;
      const $ = cheerio.load(html);
      const sounds = [];
  
      // Itera sobre os elementos que contêm os sons, até um máximo de 100
      $('.instant').each((index, element) => {
        if (index >= 100) return false; // Limita a 100 sons
  
        const soundTitle = $(element).find('.instant-link').text();
        const soundUrl = 'https://www.myinstants.com' + $(element).find('a').attr('href');
        const soundPreview = $(element).find('audio').attr('src');
  
        sounds.push({
          title: soundTitle,
          url: soundUrl,
          preview: soundPreview,
        });
      });
  
      return sounds;
    } catch (error) {
      console.error(`Erro ao buscar sons: ${error}`);
      throw new Error('Erro ao buscar sons');
    }
  };



