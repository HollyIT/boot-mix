#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')

/*
  Find our webpack script. Order is:
  - Local node_modules
  - Workspace node_modules
 */
let webpack = path.resolve(process.cwd(), 'node_modules/webpack/bin/webpack.js')
if (!fs.existsSync(webpack)) {
    webpack = path.resolve(path.dirname(require.resolve('webpack')), '../bin/webpack.js')
}

/*
Search for our config file. Order is:
 - package.json defined
 - local node_modules
 - workspace node_modules
 */
let config = process.env.npm_package_mixConfig
if (config && !fs.existsSync(config)) {
    console.error('Unable to locate mix config: file ' + config)
    process.exit()
}
if (!config) {
    config = path.resolve(process.cwd(), 'node_modules/laravel-mix/setup/webpack.config.js')
    if (!fs.existsSync(config)) {
        config = path.resolve(require.resolve('laravel-mix'), '../../setup/webpack.config.js')
    }

}


let args = process.argv.slice(2)
let regEx = new RegExp(/^--config\s*=/, 'i')
args = args.filter((item) => {
    item = item.trim()
    if (regEx.test(item)) {
        return false
    }
    return true
})

args.push('--config=' + config)
childProcess.fork(webpack, args)
