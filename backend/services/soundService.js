const axios = require('axios');
const cheerio = require('cheerio');
const { saveSounds, getSounds } = require('./redisService'); // Importa os serviços Redis

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
  const cacheKey = 'availableSounds';

  try {
    // 1. Tentar obter os sons do Redis
    const cachedSounds = await getSounds();
    if (cachedSounds) {
      console.log('Retornando sons do cache do Redis');
      return cachedSounds;
    }

    // 2. Caso não haja cache, fazer a chamada na API
    console.log('Cache vazio, buscando sons da API...');
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

    // 3. Salvar os sons no Redis com expiração de 48 horas
    await saveSounds(sounds);
    console.log('Sons salvos no Redis com sucesso.');

    return sounds;
  } catch (error) {
    console.error(`Erro ao buscar sons: ${error}`);
    throw new Error('Erro ao buscar sons');
  }
};
