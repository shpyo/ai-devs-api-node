import puppeteer from 'puppeteer';

export const getPageContent = async function (url: string) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const f = await page.$('pre');
    const text = await (await f.getProperty('textContent')).jsonValue();
    browser.close();

    return text;
  } catch (e) {
    browser.close();
    return 'timeout error';
  }
};
