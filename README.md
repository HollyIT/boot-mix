# boot-mix
A simple helper to make working with Yarn Workspaces and Laravel Mix much simpler.

## What does this solve?

When working with monorepos, utilizing tools such as Yarn Workspaces, Laravel
Mix usually breaks. The problem occurs from Webpack and Mix files being
stored in the parent node_modules and a child package not being able to
resolve the location. Take this typical package.json script from a Laravel Mix
package:

`{"development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"}`

When you execute the development script Node will search for the webpack.js file
in the node_modules folder relative to the package.json, however if you're
in a situation where Webpack and/or Mix are hoisted to an upper directory,
the script will cause an error.

## Using this script

First you must require this package in your packages.json

`yarn add -D @hollyit/boot-mix`

Once added, the next step is to update your package.json mix scripts. First replace:

`node_modules/webpack/bin/webpack.js`

With

`mix`

Second you can remove the --config argument:

`--config=node_modules/laravel-mix/setup/webpack.config.js`

After that you can normally run your mix scripts without the errors.

## Customizing the location of webpack.config.js

By default this script will look for the webpack.config.js in the following
locations:

- A package.json customized location
- The node_modules directory relative to the package.json
- The node_modules directory used in the workspace.

You can offer a customized webpack.config.js file by added a "mixConfig"
property to your package.json. This file location is relative to the
local package.json (where your scripts section is located). It may
also be a relative location.

## License

Boot Mix is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).



