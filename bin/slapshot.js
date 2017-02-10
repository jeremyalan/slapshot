#! /usr/bin/env node

const slapshot = require('../lib/slapshot');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

slapshot(args);
