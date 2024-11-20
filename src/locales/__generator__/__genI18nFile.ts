import dotenv from 'dotenv';
import fs from 'fs';
import { google } from 'googleapis';
import zipObjectDeep from 'lodash/zipObjectDeep';
import path from 'path';
import util from 'util';

// override process.env
const envConfig = dotenv.parse(fs.readFileSync(path.resolve('.env')));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const csvToJson = (csv: string, delimiter = ',') => {
  const lines = csv.split('\n');
  const json = [];

  // 取得表頭欄位
  const headers = lines[0]
    .split(delimiter)
    .map((header: any) => header.toLowerCase().trim());
  for (let i = 1; i < lines.length; i += 1) {
    const obj: { [key: string]: string } = {};
    if (lines[i] !== '') {
      const currentline = lines[i].split(delimiter);
      if (currentline[0] !== '') {
        for (let j = 0; j < headers.length; j += 1) {
          obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
        }
        json.push(obj);
      }
    }
  }
  return json;
};

// 輸出到前端吃翻譯檔的資料夾
function generateI18nFiles(data: any) {
  // 產生n個語系檔
  data.forEach((datum: any) => {
    if (datum.type === 'json') {
      fs.writeFileSync(
        path.resolve(__dirname, '../', datum.fileName),
        JSON.stringify(datum.content, null, 2),
      );
    }

    if (datum.type === 'ts') {
      // const content = JSON.stringify(datum.content, null, 2)
      //   .replace(/"(\w.*)":/g, (searchStr, replaceStr) => `${replaceStr}:`)
      //   .replace(/"(\w.*)"/g, (searchStr, replaceStr) => `'${replaceStr}'`)
      //   .replace(/'(\w.*)'(?!,)/g, (searchStr, replaceStr) => `'${replaceStr}',`)
      //   .replace(/(})(?!,)/g, (searchStr, replaceStr) => `${replaceStr},`)
      //   .replace(/(,)$/g, () => ';');

      // fs.writeFileSync(path.resolve(__dirname, '../', datum.fileName), `export default ${content}\n`);

      let newContent = ``;

      Object.keys(datum.content).forEach((key, index, array) => {
        const tempContent = JSON.stringify(datum.content[key], null, 2)
          .replace(/"(\w.*)":/g, (searchStr, replaceStr) => `${replaceStr}:`)
          .replace(/"(\w.*)"/g, (searchStr, replaceStr) => `'${replaceStr}'`)
          .replace(
            /'(\w.*)'(?!,)/g,
            (searchStr, replaceStr) => `'${replaceStr}',`,
          )
          .replace(/(})(?!,)/g, (searchStr, replaceStr) => `${replaceStr},`)
          .replace(/(,)$/g, () => ';');

        if (index < array.length - 1) {
          newContent += `export const ${key} = ${tempContent}\n\n`;
        } else {
          newContent += `export const ${key} = ${tempContent}\n`;
        }
      });

      fs.writeFileSync(
        path.resolve(__dirname, '../', datum.fileName),
        newContent,
      );
    }
  });
}

const SPREADSHEETID = process.env.GOOGLE_SPREADSHEET_ID;

async function listMajors() {
  try {
    const spreadsheetId = SPREADSHEETID;
    const sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_API_KEY,
    });
    // console.log(sheets.spreadsheets.get);
    const sheetsData = await util.promisify(sheets.spreadsheets.get)({
      spreadsheetId,
    });
    // Fetch all tabs
    const sheetsTabs = sheetsData.data.sheets.map(
      (sheet: any) => sheet.properties.title,
    );

    const asyncSheetsSpreadsheetsValuesGet = util.promisify(
      sheets.spreadsheets.values.get,
    );
    const response2 = await Promise.all(
      sheetsTabs.map((tab: any) =>
        asyncSheetsSpreadsheetsValuesGet({
          spreadsheetId,
          range: `${tab}!A1:Z`,
        }),
      ),
    );

    const header = response2[0].data.values[0].join('@_#');
    const content = response2.map((data) =>
      data.data.values
        .filter((d: any, i: any) => i !== 0 && d[0] !== '')
        .map((v: any) => v.join('@_#')),
    );

    return [header, ...content.reduce((a, d) => [...a, ...d], [])].join('\n');
  } catch (err) {
    console.log('[ERROR]i18nHelper執行失敗', err);
  }
}

(async () => {
  const filePromise = (await listMajors()) || '';
  const csv = csvToJson(filePromise, '@_#');
  const keyArray = csv.map((f) => f.key);
  const zhTW = csv.map((f) => f['zh-tw']);
  const enUS = csv.map((f) => f['en-us']);
  // console.log(csv, keyArray, enUS, zhTW);

  generateI18nFiles([
    {
      fileName: 'zh-TW.json',
      content: zipObjectDeep(keyArray, zhTW),
      type: 'json',
    },
    {
      fileName: 'en-US.json',
      content: zipObjectDeep(keyArray, enUS),
      type: 'json',
    },
    {
      fileName: 'i18nKeys.ts',
      content: zipObjectDeep(keyArray, keyArray),
      type: 'ts',
    },
  ]);
})();
