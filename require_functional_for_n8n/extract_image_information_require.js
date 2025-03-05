const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Cambia a true si no necesitas ver el navegador
    slowMo: 200,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();

  // Navegar a Google Ads Transparency
  await page.goto("https://adstransparency.google.com/", {
    waitUntil: "networkidle2",
  });

  // Esperar a que aparezca el campo de búsqueda
  await page.waitForSelector("input.input-area", { timeout: 10000 });

  // Escribir en el input
  await page.type("input.input-area", "SCOTIABANK CHILE");
  await delay(4000);

  // Presionar Enter
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  // Esperar a que carguen los resultados
  await page.waitForSelector("priority-creative-grid a img", { timeout: 20000 });
  console.log("Resultados iniciales cargados...");

  // Scroll para cargar más anuncios
  let previousHeight = 0;
  let scrollAttempts = 0;
  const maxScrolls = 15;

  while (scrollAttempts < maxScrolls) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await delay(4000);

    let newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === previousHeight) {
      console.log("No hay más elementos para cargar.");
      break;
    }

    previousHeight = newHeight;
    scrollAttempts++;
    console.log(`Scroll attempt ${scrollAttempts} completed.`);
  }


   // Contar las URLs de las imágenes dentro de priority-creative-grid a
   const adLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("priority-creative-grid a"))
      .map((link) => link.href)
      .filter((href) => href.includes("/advertiser/"));
  });
  console.log(`Total de enlaces contabilizados con img y sin img para comparar con la cantidad de IMG que se descargan: ${adLinks.length}`)


  console.log("Todos los anuncios han sido cargados.");

  // Se comienza con el mapeo a las imagenes de los anuncios contenidas en priority-creative-grid a img
  // Eliminar el archivo previo si existe
  const jsonFilePath = "C:/Users/Usuario/Documents/test_puppeteer/ad_images.json";
  try {
    fs.unlinkSync(jsonFilePath);
    console.log("Archivo de imágenes eliminado correctamente.");
  } catch (err) {
    console.error("No se encontró archivo previo de imágenes.");
  }

  // Extraer las URLs de las imágenes dentro de priority-creative-grid
  const adImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("priority-creative-grid a img"))
      .map((img) => img.src);
  });

  console.log(`Total de imágenes extraídas: ${adImages.length}`);
  console.log(adImages);

  // Guardar las imágenes en un JSON
  fs.writeFileSync(jsonFilePath, JSON.stringify(adImages, null, 2));

  // Descargar las imágenes localmente
  const imagesFolder = "C:/Users/Usuario/Documents/test_puppeteer/images/";

  if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder, { recursive: true });
  }

  for (let i = 0; i < adImages.length; i++) {
    const imageUrl = adImages[i];
    const imageFileName = `image_${i + 1}.jpg`;
    const imagePath = path.join(imagesFolder, imageFileName);
    
    console.log(`Descargando imagen ${i + 1}: ${imageUrl}`);

    try {
      const imagePage = await page.goto(imageUrl);
      fs.writeFileSync(imagePath, await imagePage.buffer());
      console.log(`Imagen ${i + 1} guardada en: ${imagePath}`);
    } catch (error) {
      console.error(`Error al descargar la imagen ${i + 1}:`, error);
    }
  }

  await browser.close();
  console.log("Proceso completado.");
})();

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
