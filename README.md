# playwright-bdd-ts
 npm test --env=dev

 npm install

 npm run test:tags

 npx playwright show-trace

   await page.goto('https://www.apple.com/');
  await page.getByLabel('Store', { exact: true }).click();
  await page.getByLabel('Shop the latest Apple products').click();
  await page.getByLabel('Shop', { exact: true }).getByRole('link', { name: 'Mac' }).click();
  await page.locator('.rf-hcard-img').first().click();
  await page.getByText('Lightweight and under half an').first().click();
  await page.getByRole('radio', { name: '13” (M3)' }).click();
  await page.getByRole('radio', { name: '15” (M3)' }).click();
  await page.getByRole('link', { name: 'Buy - MacBook Air 15-inch' }).click();
  await page.getByRole('button', { name: 'Select Apple M3 chip with 8-core CPU and 10-core GPU Processor 256GB Storage' }).click();
  await page.getByLabel('24GB unified memory+ $').check();
  await page.getByLabel('1TB SSD storage+ $').check();
  await page.getByText('512GB SSD storage').click();
  await page.getByText('70W USB-C Power Adapter', { exact: true }).click();
  await page.getByLabel('Keyboard Language').selectOption('J065-CGK1');
  await page.getByText('+ $299.99').click();
  await page.getByRole('button', { name: 'Add to Bag' }).click();
  await page.getByRole('button', { name: 'Review Bag' }).click();