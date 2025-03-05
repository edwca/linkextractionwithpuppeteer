import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMode:200,defaultViewport: null,
        args: ['--start-maximized'] }); // Cambia a true si no necesitas ver el navegador
    const page = await browser.newPage();

    // Navegar a Google Ads Transparency
    await page.goto('https://adstransparency.google.com/', { waitUntil: 'networkidle2' });

    // Esperar a que aparezca el campo de búsqueda
    await page.waitForSelector('input.input-area', { timeout: 10000 });

    // Escribir en el input
    await page.type('input.input-area', 'SCOTIABANK CHILE');
    // await page.waitForTimeout(10000); // Espera 5 segundos
    // console.log(typeof page.waitForTimeout);
    await delay(4000);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

     await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
