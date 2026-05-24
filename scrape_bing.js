const https = require('https');

function searchBing(query, callback) {
  const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
    }
  }, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const urls = [];
      const regex = /(images\.unsplash\.com\/photo-[a-zA-Z0-9-\?&=_]+|unsplash\.com\/photos\/[a-zA-Z0-9-]+|images\.pexels\.com\/photos\/\d+|pexels\.com\/photo\/[a-zA-Z0-9-]+)/g;
      let match;
      while ((match = regex.exec(data)) !== null) {
        urls.push(match[1]);
      }
      callback(null, [...new Set(urls)]);
    });
  }).on('error', (err) => {
    callback(err);
  });
}

searchBing('site:unsplash.com watermelon drink photo', (err, urls) => {
  if (err) console.error(err);
  else console.log('Watermelon Drink urls:', urls);
});

searchBing('site:unsplash.com matcha bubble tea photo', (err, urls) => {
  if (err) console.error(err);
  else console.log('Matcha Boba urls:', urls);
});
