import fs from 'node:fs';
import { join, dirname } from 'node:path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const testsDir = join(dirName, 'tests');
const testFiles = fs.readdirSync(testsDir).filter(file => file.endsWith('.html'));

const results = [];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const file of testFiles) {
    const filePath = `file://${join(testsDir, file)}`;
    await page.goto(filePath);
    const result = await page.evaluate(() => {
        return window.performanceResults;
    });
    results.push(...result);
}
await browser.close();

const now = new Date();
const dateString = now.toISOString().slice(0, 19).replace(/:/g, '-');
const csvFilePath = join(dirName, 'out', `${dateString}.csv`);

const header = `${Object.keys(results[0]).join(',')}\n`;
fs.writeFileSync(csvFilePath, header);
for (const result of results) {
    const values = `${Object.values(result).join(',')}\n`;
    fs.appendFileSync(csvFilePath, values);
}

console.log(`Completed: ${csvFilePath}`);
