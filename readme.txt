# Link Extraction with Puppeteer

This project uses [Puppeteer](https://pptr.dev/), a Node.js library that provides a high-level API to control Chrome/Chromium browsers, allowing automation of web tasks such as link extraction.

## 📌 Prerequisites

- **Node.js**: Ensure you have version **12.0.0** or higher installed. You can check by running:

  ```bash
  node -v
If not installed, download it from the official Node.js website.

npm: Comes bundled with Node.js. Verify the installation with:

bash
Copiar
Editar
npm -v
⚙️ Installation
Clone this repository:

bash
Copiar
Editar
git clone https://github.com/edwca/linkextractionwithpuppeteer.git
Navigate to the project directory:

bash
Copiar
Editar
cd linkextractionwithpuppeteer
Initialize the project and configure package.json:

If you don’t have a package.json file yet, create one with:

bash
Copiar
Editar
npm init -y
Then, edit the package.json file to include "type": "module", enabling ES modules in Node.js:

json
Copiar
Editar
{
  "name": "linkextractionwithpuppeteer",
  "version": "1.0.0",
  "description": "Link extraction using Puppeteer",
  "main": "extract_information.js",
  "type": "module",
  "scripts": {
    "start": "node extract_information.js"
  },
  "dependencies": {
    "puppeteer": "^21.3.8"
  }
}
This configures the project to use ES modules and defines a start script to run extract_information.js.

Install dependencies:

bash
Copiar
Editar
npm install
This will install Puppeteer and any other dependencies specified in package.json.

🚀 Usage
To execute the link extraction script, run:

bash
Copiar
Editar
npm start
This command will start the extract_information.js script, which uses Puppeteer to automate link extraction from web pages.