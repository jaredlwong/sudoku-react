FROM node:latest

RUN apt-get update && apt-get install -y tree

# to install latest yarn globally
# https://github.com/yarnpkg/yarn/issues/2816
RUN rm /usr/local/bin/yarn /usr/local/bin/yarnpkg

# https://yarnpkg.com/getting-started/install
# https://www.typescriptlang.org/#installation
# https://webpack.js.org/guides/getting-started/#basic-setup
RUN npm install -g yarn typescript webpack webpack-cli

WORKDIR /web
