const http = require('http');
const URL = require('url');
const fs = require('fs');
const data = require('./urls.json');
const path = require('path');

function writeFile(cb) {
  //callback
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    err => {
      if (err) throw err;
      cb(JSON.stringify({ message: 'ok' }));
    } //Writefile: caminho, dados e callback
  );
}

http
  .createServer((req, res) => {
    //CORS -> permitir que da porta 5000 se acesse a porta 3000, na verdade, qualquer lugar
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*'
    });
    const { name, url, del } = URL.parse(req.url, true).query; //Da URL fornecida ele vai extrair o valor de name, url e del
    //all resources
    if (!name || !url) return res.end(JSON.stringify(data));
    if (del) {
      data.urls = data.urls.filter(item => String(item.url) !== String(url)); //Se a URL que está cadastrada for igual a URL passada, ela é DELETADA
      return writeFile(message => {
        res.end(message);
      });
    }
    data.urls.push({ name, url });
    return writeFile(message => res.end(message));
  })
  .listen(3000, () => console.log('API is running on Port 3000'));

//http://localhost:3000/?name=Rocketseat&url=https://rocketseat.com.br&del=1
//http://localhost:3000/?name=Google&url=https://google.com
