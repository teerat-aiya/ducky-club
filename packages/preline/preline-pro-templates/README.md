# Preline Pro Templates #

Thank you for purchasing Preline Pro and supporting our project! Preline Pro Templates offer enhanced UI components and layouts for advanced web app projects.

## Getting Started

Preline Pro builds upon Preline UI. We recommend installing and running Preline UI in your project first for seamless integration.

### Quick Setup

This guide will help you get started with Preline UI, including how to run, customize, update, and integrate your project!

First, you need to make sure that you have a working <a href="https://tailwindcss.com/">Tailwind CSS</a> project installed and that you also have <a href="https://nodejs.org/en/">Node</a> and <a href="https://www.npmjs.com/">NPM</a> installed on your machine.

### Require via NPM

1. Install <code>preline</code> via npm

<pre><code>npm i preline</code></pre>

2. Include Preline UI as a plugin in the <code>tailwind.config.js</code> file

<pre><code>module.exports = {
  content: [
    'node_modules/preline/dist/*.js'
  ],
  plugins: [
    require('preline/plugin')
  ],
}</code></pre>

3. Include the JavaScript <code><script></code> that powers the interactive elements near the end of your <code>&lt;body&gt;</code> tag:

<pre><code><script src="./node_modules/preline/dist/preline.js"></script></code></pre>

## Documentation

For full documentation of the Preline options, visit <a href="https://preline.co/">preline.co</a>. The site also contains information on the wide variety of <a href="https://preline.co/plugins.html">plugins</a> that are available for TailwindCSS projects.


## License

Preline Pro comes with custom license terms and condition, please visit [Preline Pro](https://preline.co/docs/license.html) for more details.

Preline UI is Open Source project and licensed under [MIT](https://preline.co/docs/license.html).

Preline UI Figma is free for both commercial and personal projects, learn more [here](https://preline.co/license.html).
  
All brand icons are trademarks of their respective owners including Preline. The use of these trademarks does not indicate endorsement of the trademark holder by Preline Labs Ltd, nor vice versa.

