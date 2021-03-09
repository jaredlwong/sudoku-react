tconfig.json
------------
- simple configuration to support JSX and compile TypeScript down to ES5.
- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- https://webpack.js.org/guides/typescript/
- https://webpack.js.org/guides/development/
- sourceMap is used for debugging through ts-loader and webpack


webpack.config.js
-----------------
- This will direct webpack to enter through `./index.ts`, load all `.ts` and
  `.tsx` files through the `ts-loader`, and output a `bundle.js` file in our
  `dist` directory.
- devtool: 'inline-source-map' uses dev maps

https://github.com/tomm/react-typescript-helloworld
