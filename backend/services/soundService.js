const axios = require('axios');
const cheerio = require('cheerio');

// Função para extrair a URL direta do áudio
const getDirectAudioUrl = async (pageUrl) => {
  try {
    const response = await axios.get(pageUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const audioUrl = $('meta[property="og:audio"]').attr('content');
    return audioUrl || null;
  } catch (error) {
    console.error(`Erro ao buscar URL direta do áudio (${pageUrl}):`, error);
    return null;
  }
};

exports.searchingSounds = async (query) => {
  try {
    const response = await axios.get(`https://www.myinstants.com/search/?name=${query}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const sounds = [];

    const soundElements = $('.instant');
    for (let index = 0; index < soundElements.length; index++) {
      const element = soundElements[index];
      const soundTitle = $(element).find('.instant-link').text();
      const soundUrl = 'https://www.myinstants.com' + $(element).find('a').attr('href');

      // Obtém a URL direta do áudio
      const soundDirectUrl = await getDirectAudioUrl(soundUrl);

      sounds.push({
        title: soundTitle,
        url: soundUrl,
        directUrl: soundDirectUrl, // URL direta do áudio
      });
    }

    return sounds;
  } catch (error) {
    console.error(`Erro ao buscar sons: ${error}`);
    throw new Error(`Erro ao buscar sons: ${error}`);
  }
};

exports.getTopSounds = async () => {
  try {
    const response = await axios.get('https://www.myinstants.com/');
    const html = response.data;
    const $ = cheerio.load(html);
    const sounds = [];

    const soundElements = $('.instant');
    for (let index = 0; index < Math.min(100, soundElements.length); index++) {
      const element = soundElements[index];
      const soundTitle = $(element).find('.instant-link').text();
      const soundUrl = 'https://www.myinstants.com' + $(element).find('a').attr('href');

      // Obtém a URL direta do áudio
      const soundDirectUrl = await getDirectAudioUrl(soundUrl);

      sounds.push({
        title: soundTitle,
        url: soundUrl,
        directUrl: soundDirectUrl, // URL direta do áudio
      });
    }

    return sounds;
  } catch (error) {
    console.error(`Erro ao buscar sons: ${error}`);
    throw new Error('Erro ao buscar sons');
  }
};
