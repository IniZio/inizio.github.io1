---
title: Create a NPM project from scratch
date: '2016-08-26 08:08:00'
layout: default
---
Uses Npm, Typescript, Angular2, Webpack

# Stuff I not sure about:
- I think npm devdependencies are stuff that are used during developing and compiling the codes, while dependencies are for running the website?


# Npm and typings
Install Nodejs, NPM from official website. [NodeJs](https://nodejs.org/)

Open a new folder, run: `npm init`.

```
.
package.json
```

# Angular2
Install some @angular files:
```bash
$ npm i -S @angular/common @angular/compiler @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/platform-server @angular/router angularfire2 
```

# Webpack
Install webpack and webpack-dev-server:
```bash
$ npm i -D webpack webpack-dev-server webpack-merge
```
| Loader   | Function|
|:-|:-|
|Webpack| Build tool that treats each file processing as loaders instead of pipes or tasks|
|Webpack-dev-server| a webpack server for hosting the project on localhost to debug|
|Webpack-merge|sometimes you will have multiple webpack configs for different platforms/stages e.g. mobile, electron, develop, production|


