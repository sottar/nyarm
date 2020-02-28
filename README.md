# nyarm

[![npm version](https://badge.fury.io/js/nyarm.svg)](https://badge.fury.io/js/nyarm)
[![Actions Status](https://github.com/sottar/nyarm/workflows/build/badge.svg)](https://github.com/sottar/nyarm/actions)

npm + yarn => nyarm

Can you answer npm or yarn in your project?
You can use just nyarm for all your project.

## install

```sh
$ npm install -g nyarm
# or 
$ yarn global add nyarm
```

## usage

```sh
$ nyarm {install | add}
# npm project => npm install
# yarn project => yarn install

$ nyarm {install | add} foobar
# npm project => npm install foobar
# yarn project => yarn add foobar

$ nyarm {uninstall | remove} foobar
# npm project => npm uninstall foobar
# yarn project => yarn remove foobar
```

## Licence
MIT
