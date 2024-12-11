import { Locator, Page, Response } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "@playwright/test";
import Log from "../../../helper/config/logConfig";


export type ScreenshotOptions = {
    animations?: `disabled` | `allow`;
    fullPage?: boolean,
    clip?: { x: number; y: number; width: number; height: number };
    caret?: `hide` | `initial`;
    mask?: Locator[];
    maskColor?: string;
    maxDiffPixelRatio?: number;
    maxDiffPixels?: number;
    omitBackground?: boolean;
    scale?: `css` | `device`;
    stylePath?: string | string[];
    threshold?: number;
    timeout?: number;
}
export default class uiAssertBuiAssertScreenshotBasePage {
    protected page: Page;
    protected loggerAttachment: ICreateAttachment;
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        this.page = page;
        this.loggerAttachment = loggerAttachment;
    }

    async compareFullPageScreenShots(screenshotName: string, options: ScreenshotOptions = {}) {
        const fullOptions = {
            fullPage: options.fullPage ?? true,
            clip: options.clip,
            animations: options.animations ?? `disabled`,
            caret: options.caret ?? `hide`,
            mask: options.mask,
            maskColor: options.maskColor,
            maxDiffPixelRatio: options.maxDiffPixelRatio,
            maxDiffPixels: options.maxDiffPixels,
            omitBackground: options.omitBackground,
            scale: options.scale,
            stylePath: options.stylePath,
            threshold: options.threshold ?? 0.2,
            timeout: options.timeout,
            path: `./src/tests/test_resources/compare_screenshots/${screenshotName}.png`
        };
        await expect(this.page).toHaveScreenshot(fullOptions);
    }

    async compareElementScreenShots(screenshotName: string,object:any, options: ScreenshotOptions = {}) {
        const element=this.getByLocator(object);
        const elementOptions = {
            fullPage: options.fullPage ?? true,
            clip: options.clip,
            animations: options.animations ?? `disabled`,
            caret: options.caret ?? `hide`,
            mask: options.mask,
            maskColor: options.maskColor,
            maxDiffPixelRatio: options.maxDiffPixelRatio,
            maxDiffPixels: options.maxDiffPixels,
            omitBackground: options.omitBackground,
            scale: options.scale,
            stylePath: options.stylePath,
            threshold: options.threshold ?? 0.2,
            timeout: options.timeout,
            path: `./src/tests/test_resources/compare_screenshots/${screenshotName}.png`
        };
        await expect(element).toHaveScreenshot(elementOptions);
    }

    getByLocator(object: any) {
        return this.page.locator(object["locator"], object["locatorOptions"]);
    }

}
