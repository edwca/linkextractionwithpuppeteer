# Link Extraction with Puppeteer
__________________________________________________________________________
This project uses [Puppeteer](https://pptr.dev/),
a Node.js library that provides a high-level API to control Chrome/Chromium browsers,
allowing automation of web tasks such as link extraction.
_________________________________________________________________________________________
## 📌 Prerequisites
- **Node.js**: Ensure you have version **12.0.0** or higher installed. You can check by running:
  ```bash
  node -v
If not installed, download it from the official Node.js website.

npm: Comes bundled with Node.js. Verify the installation with:


⚙️ Installation
Clone this repository:
git clone https://github.com/edwca/linkextractionwithpuppeteer.git
Navigate to the project directory:

⚙️ Packaje.json configurations
Initialize the project and configure package.json:
Then, edit the package.json file to include "type": "module", enabling ES modules in Node.js:
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


🚀 Usage
To execute the link extraction script, run:
npm start

🚀 Information extracted can be found at
./download

⚙️ Docker n8n
Comandos:
1. docker volume create n8n_data
2. docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
3. Open http://localhost:5678/

⚙️ Local server n8n
Comandos:
1. npx n8n
2.- Open http://localhost:5678/