# nyarm

[![npm version](https://badge.fury.io/js/nyarm.svg)](https://badge.fury.io/js/nyarm)
[![Actions Status](https://github.com/sottar/nyarm/workflows/build/badge.svg)](https://github.com/sottar/nyarm/actions)

npm + yarn => nyarm

Which one are you using npm or yarn?  
You can use just **nyarm** for all your projects.

## install

```sh
$ npm install -g nyarm
# or 
$ yarn global add nyarm
```

## usage

Just use the nyarm command instead of npm or yarn

```sh
$ nyarm {install | add}
# npm project => npm install
# yarn project => yarn install

$ nyarm {install | add} {module_name}
# npm project => npm install {module_name}
# yarn project => yarn add {module_name}

$ nyarm {uninstall | remove} {module_name}
# npm project => npm uninstall {module_name}
# yarn project => yarn remove {module_name}
```

## Licence
MIT
