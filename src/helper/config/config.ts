import { LaunchOptions, BrowserContextOptions } from "@playwright/test";

loadEnv();

export const firefoxBrowserOptions: LaunchOptions = {
  headless: process.env.HEADLESS === "false",
  args: ["--start-maximized"],
  // timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
  //downloadsPath: './test-results/downloads',
};

export const chromeBrowserOptions: LaunchOptions = {
  slowMo: 1500,
  headless: process.env.HEADLESS === "false",
  devtools: false,
  channel: "chrome",
  args: ["--start-maximized", "--disable-dev-shm-usage", "--no-sandbox"],
};

export const edgeBrowserOptions: LaunchOptions = {
  headless: process.env.HEADLESS === "false",
  channel: "msedge",
  args: ["--start-maximized"],
};

export const browserContextOptions: BrowserContextOptions = {
  viewport: {
    width: Number.parseInt(process.env.VIEWPORT_WIDTH as string),
    height: Number.parseInt(process.env.VIEWPORT_HEIGHT as string),
  },
  javaScriptEnabled: true,
  ignoreHTTPSErrors: true,
  acceptDownloads: true,
  recordVideo: process.env.RECORD_VIDEO
    ? { dir: "./test-results/videos" }
    : undefined,
};

export function loadEnv() {
  const env = process.env.npm_config_env || "dev";
  require("dotenv").config({ path: `./src/helper/config/.env.${env}` });
}
