const { Console } = require('console');
const os = require('os'); //Importando o módulo de dentro do Node
const log = require('./logger');

setInterval(() => {
  //1 arg função 2 arg tempo pra o eventLoop executar
  const { freemem, totalmem } = os; //Extraindo as duas variáveis de dentro de os

  //console.log(`${parseInt(freemem()) / 1024 / 1024} MB`);

  const total = parseInt(totalmem() / 1024 / 1024);
  const mem = parseInt(freemem() / 1024 / 1024);
  const percents = parseInt((1 - mem / total) * 100); //estava dividindo 2 strings, por isso dava NaN

  //console.log(typeof percents);

  const stats = {
    free: `${mem} MB`,
    total: `${total} MB`,
    usage: `${percents} %`
  };
  console.clear();
  console.log('========PC STATS========');
  console.table(stats);
  log(`${JSON.stringify(stats)}\n`);
}, 1500);
