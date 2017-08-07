#!/usr/bin/env node

const fs = require('fs');
const baltar = require('baltar');

if(fs.existsSync('./runnner/runnner_nm.tgz'))  {
  console.log('unpack: extracting prebuilt dependencies')
  const ins = fs.createReadStream('./runnner/runnner_nm.tgz');
  ins.pipe(baltar.unpack('./runnner'));
}
