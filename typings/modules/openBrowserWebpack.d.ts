declare module "open-browser-webpack-plugin" {
  import { Plugin } from "webpack";

  export default OpenBrowserWebpackPlugin;

  class OpenBrowserWebpackPlugin extends Plugin {
    constructor(option: {
      url: string
    })
  }
}
