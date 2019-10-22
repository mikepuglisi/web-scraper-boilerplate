const puppeteer = require('puppeteer');
const { knex } = require('./database');
const fs = require('fs');
const fsp = fs.promises;

const csv=require('csvtojson')

const upsert = async (knexOrTableName, { where, update, create }) => {
  const knexObj =
    typeof knexOrTableName === "string"
      ? knex(knexOrTableName)
      : knexOrTableName;

  return knexObj.where(where).then(result => {
    if (result.length > 0 && update) {
      return knexObj
        .where(where)
        .update(update, ["*"])
        .then(returnData => {
          return returnData[0];
        });
    } else if (result.length === 0 && create) {
      return knexObj.insert(create, ["*"]).then(returnData => {
        return returnData[0];
      });
    }
  });
};

const normalizeKeysForDatabase = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.charAt(0).toLowerCase() + key.replace(/ID/, "Id").slice(1)] = obj[key]
    return acc;
  }, {});
}

async function main() {
  const csvFilePath='./database/data/RealPropertyGeneralMailingInformation.csv'
// Async / await usage
  csv()
  .fromFile(csvFilePath)
  .subscribe(async (csvLine)=>{ 
    // csvLine =>  "1,2,3" and "4,5,6"
    try {
      const recordToUpsert = normalizeKeysForDatabase(csvLine)
      recordToUpsert.legacyId = recordToUpsert.propertyId;
      delete recordToUpsert.propertyId;
      
      const inserted =  await upsert('properties', { where: { parcelId: recordToUpsert.parcelId }, update: recordToUpsert, create: recordToUpsert} )
      
    } catch (e) {
      console.log('er', e)
    }

  })

  // const browser = await puppeteer.launch({headless: false, userDataDir: "./user_data"});
  // const page = await browser.newPage();
  // await page.setViewport({width: 1200, height: 720});
  // page.on('response', response => {
  //   // allow XHR only
  //   console.log('response', response)
  //   if ('xhr' !== response.request().resourceType()){
  //       return;
  //   }
  // });

  // await page.goto(`https://www.google.com`, { waitUntil: 'networkidle0' }); // wait until page load , { waitUntil: 'networkidle0' }
  
  
  
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