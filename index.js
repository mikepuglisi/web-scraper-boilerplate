const puppeteer = require('puppeteer');
const fs = require('fs');
const fsp = fs.promises;


async function main() {
  const browser = await puppeteer.launch({headless: false, userDataDir: "./user_data"});
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 720});
  page.on('response', response => {
    // allow XHR only
    console.log('response', response)
    if ('xhr' !== response.request().resourceType()){
        return;
    }
  });

  await page.goto(`https://www.google.com`, { waitUntil: 'networkidle0' }); // wait until page load , { waitUntil: 'networkidle0' }
  // const loginRequired = await page.$('#loginname')
  // if (loginRequired) {
  //   await page.type('#loginname', "");
  //   await page.click('[type=submit]');
  //   try {
  //     await page.waitForSelector('#password');
  //     await page.type('#password', "");
  //   } catch (e) {
  //     if (e instanceof puppeteer.errors.TimeoutError) {
  //       // Do something if this is a timeout.
  //     }
  //   }
  //   // await page.click('[type=submit]');
  //   //await page.click('#rememberMe');
  //   // await page.click('#form-submit');
  //   await Promise.all([
  //     page.click('[type=submit]'),
  //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
  //   ]);
  // }
  // const rateLink = await page.$('[data-toggle-rate-category]')
  // if (rateLink) {
  //   await Promise.all([
  //     page.click('[data-toggle-rate-category]'),
  //     page.waitForSelector('[href="#daterange-changes"]')
  //   ])
  // } else {
  //   console.log("RATE LINK NOT FOUND")
  // }

};

main();