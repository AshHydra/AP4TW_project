Option A:
Client-side web application with REST API

Utilization of purely client-side technologies HTML5, CSS, JavaScript, or JS development frameworks (Angular, React, Vue ...)
Data consumption through REST API (an existing REST API on the Internet can be used)
Utilization of browser storage, e.g., for storing history or offline data
Example projects: Weather information display web application with the ability to set favorite cities, Web application - task manager, Web application for saving points of interest on a map...



## install npm
to install npm packages run 

```
npm install
``` 
this will generate
`node_modules` containing all deps
and `package-lock.json`

in root

after that run it with:

```
npm run dev
```
this will build and run your dev server over `localhost:3000`

to build the production build you do 

```
npm run build
```