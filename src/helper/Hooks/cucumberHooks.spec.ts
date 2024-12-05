import {
  Before,
  After,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  AfterStep,
  BeforeStep,
  formatterHelpers,
  ITestCaseHookParameter,
  Status,
} from "@cucumber/cucumber";

import {
  Browser,
  BrowserContext,
  Page,
  ChromiumBrowser,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  chromium,
  LaunchOptions,
  firefox,
} from "playwright";

import {
  loadEnv,
  chromeBrowserOptions,
  firefoxBrowserOptions,
  edgeBrowserOptions,
  browserContextOptions,
  getBrowserCookieValue,
} from "../config/browserConfig";

import Log from "../config/logConfig";


setDefaultTimeout(1000 * 60 * 2);

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;
let scenarioName: string;
let hasFailed = false;

BeforeAll(async () => {
  loadEnv();
  switch (process.env.BROWSER) {
    case "chrome":
      browser = await chromium.launch(chromeBrowserOptions);
      break;
    case "edge":
      browser = await chromium.launch(edgeBrowserOptions);
      break;
    case "firefox":
      browser = await firefox.launch(firefoxBrowserOptions);
      break;
    default:
      throw new Error(`invalid browser type ${[process.env.BROWSE]}`);
  }
});

Before(async ({ pickle, gherkinDocument }: ITestCaseHookParameter) => {
  try {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
    Log.testBegin(`${pickle.name}:${line}`);
    bCtx = await browser.newContext(browserContextOptions);
    await bCtx.clearCookies();
    await bCtx.tracing.start({ screenshots: true, snapshots: true });
    page = await bCtx.newPage();
    await page.goto(process.env.BASE_URL as string);
    Log.info(`----session ID: ${getBrowserCookieValue(await bCtx.cookies(""), "SID")}-------`)
  }
  catch (error) {
    throw new Error(`Before hook failed , captured error ${error}`);
  }
  return page;
});

After(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
  try {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
    scenarioName = pickle.name;
    const videoPath = await this.page?.video()?.path();
    this.attach(`--------${pickle.name} is ended------`);
    this.attach(`SCENARIO STATUS IS >>>> ${result?.status}----`)
    if (result?.status == Status.FAILED) {
      hasFailed = true;
      this.attach("say cheese for snapshot!!!!");
      await new Promise(resolve => setTimeout(resolve, 4000));
      const img = await page.screenshot({
        path: `./reports/${pickle.name}.png`,
      });
      this.attach(img, "image/png");
    }
    await bCtx?.tracing.stop({
      path: `./reports/${scenarioName}_trace.zip`
    });
    await this.page?.close();
    await this.context?.close();
    Log.testEnd(`${pickle.name}: $(line)`, `$(result?.status}`);
  }
  catch (error) {
    if (!browser.close()) {
      await browser.close();
    }
    throw new Error(`After hook failed for ${pickle.name}, captured error ${error}`);
  } finally {
    try {
      if (this.page) {
        await this.page?.close();
      }
    }
    catch (error) {
      console.error("error closing the page", error);
    }
    try {
      await this.context?.close();
    }
    catch (error) {
      console.error("error closing the browser context", error);
    }
    try {
      if (this.browser && !this.browser.closed) {
        await browser.close();
      }
    }
    catch (error) {
      console.error("error closing the browser ", error);

    }
  }
});

BeforeStep(async function (scenario) {
  this.attach(`--------${scenario.pickleStep.text} is started--------`);
});

AfterStep(async function (scenario) {
  try {
    if (scenario.result?.status === Status.PASSED) {
      this.attach(`--------${scenario.pickleStep.text} is ended--------`);
      await new Promise(resolve => setTimeout(resolve, 4000));
      const img = await page.screenshot({
        path: `./reports/${scenario.pickle.name}.png`,
      });
      this.attach(img, "image/png");
    }
  } catch (error) {
    throw new Error(`AfterStep hook failed for screenshot ${scenario.pickle.name}, captured error ${error}`);
  }
});

AfterAll(async function () { });
export function getPage(): Page {
  return page;
}
