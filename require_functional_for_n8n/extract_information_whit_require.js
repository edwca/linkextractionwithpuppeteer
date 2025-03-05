// const puppeteer = require('puppeteer');
const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // Cambia a true si no necesitas ver el navegador
  const browser = await puppeteer.launch({
    headless: false,
    slowMode: 200,
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
  await page.waitForSelector("priority-creative-grid", { timeout: 20000 });

  console.log("Resultados iniciales cargados...");

  // Realizar scroll para cargar más anuncios
  let previousHeight = 0;
  let scrollAttempts = 0;
  const maxScrolls = 15; // Ajusta según el número de elementos esperados

  while (scrollAttempts < maxScrolls) {
    // Scroll hasta el final
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Esperar 4 segundos para que carguen nuevos elementos
    await delay(4000);

    // Obtener la altura del scroll después del desplazamiento
    let newHeight = await page.evaluate(() => document.body.scrollHeight);

    if (newHeight === previousHeight) {
      console.log("No hay más elementos para cargar.");
      break; // Si la altura no cambia, se detiene el scroll
    }

    previousHeight = newHeight;
    scrollAttempts++;
    console.log(`Scroll attempt ${scrollAttempts} completed.`);
  }

  console.log("Todos los anuncios han sido cargados.");

  // Delete File
  try {
    fs.unlinkSync("C:/Users/Usuario/Documents/test_puppeteer/ad_links.json");
    await delay(4000);
    console.log("Archivo eliminado correctamente.");
  } catch (err) {
    console.error("Error al eliminar el archivo:", err);
  }

  // Extraer todos los enlaces dentro de "priority-creative-grid a"
  const adLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("priority-creative-grid a"))
      .map((link) => link.href)
      .filter((href) => href.includes("/advertiser/"));
  });

  console.log(`Total de enlaces extraídos: ${adLinks.length}`);
  console.log(adLinks);
  fs.writeFileSync(
    "C:/Users/Usuario/Documents/test_puppeteer/ad_links.json",
    JSON.stringify(adLinks, null, 2)
  );

  await browser.close();
})();
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
