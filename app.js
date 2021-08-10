// deps
const serve = require('serve')
const opn = require('opn');
const chalk = require('chalk');
// vars
const PORT = 3006;
const url = `http://127.0.0.1:${PORT}/menu.html`;
const Log = console.log;
const server = serve(__dirname, {
  port: PORT,
  ignore: ['node_modules']
});

opn(url);
Log(chalk.green(`server run at 127.0.0.1:${PORT}`));
