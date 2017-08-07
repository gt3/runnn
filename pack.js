#!/usr/bin/env node

const fs = require('fs');
const baltar = require('baltar');
const out = fs.createWriteStream('./runnner/runnner_nm.tgz');
console.log('pack: packing dependencies')
baltar.pack('./runnner/node_modules').pipe(out);