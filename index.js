import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const testsDir = join(dirName, 'tests');
const testFiles = readdirSync(testsDir).filter(file => file.endsWith('.html'));

const browser = await chromium.launch();
const page = await browser.newPage();

const results = [];
for (const file of testFiles) {
    const filePath = `file://${join(testsDir, file)}`;
    await page.goto(filePath);
    const result = await page.evaluate(() => {
        return window.performanceResults;
    });
    results.push(...result);
}

console.log(results);

await browser.close();
