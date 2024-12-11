import { Locator, Page, Response } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "@playwright/test";
import Log from "../../../helper/config/logConfig";

export default class uiBasePage {
    protected page: Page;
    protected loggerAttachment: ICreateAttachment;
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        this.page = page;
        this.loggerAttachment = loggerAttachment;
    }

    async pageGoTO() {
        await this.page.goto(process.env.BASE_URL as string);
        Log.info(`page launched ${process.env.BASE_URL}`);
    }

    async pageReload() {
        await this.page.reload();
        this.loggerAttachment(`page reloaded`);
    }

    async pageWaitExplicit(mseconds: any) {
        await this.page.waitForTimeout(mseconds);
        this.loggerAttachment(`page waited for ${mseconds}`);
    }

    async pageWaitComponentsLoad() {
        await this.page.waitForLoadState("load", {})
        this.loggerAttachment(`waiting page to load all components`);
    }

    async pageWaitNetworkIdle(mseconds: any) {
        await this.page.waitForLoadState("networkidle")
        this.loggerAttachment(`waiting page to load network components`);
    }
    async pageWaitForSelector(object: any) {
        await this.page.waitForSelector(object["locator"]);
        this.loggerAttachment(`waiting page for selector ${object["locator"]},for ${object["description"]}`);
    }

    async enter(locatorType: 'getByLocator' | 'getByLabel' | 'getByRole' | 'getByText', object: any, data: string) {
        switch (locatorType) {
            case 'getByLocator':
                await this.getByLocator(object).clear();
                await this.getByLocator(object).fill(data, object["actionOptions"]);
                break;
            case 'getByLabel':
                await this.getLocatorByLabel(object).clear();
                await this.getLocatorByLabel(object).fill(data, object["actionOptions"]);
                break;
            case 'getByRole':
                await this.getLocatorByRole(object).clear();
                await this.getLocatorByRole(object).fill(data, object["actionOptions"]);
                break;
            case 'getByText':
                await this.getLocatorByText(object).clear();
                await this.getLocatorByText(object).fill(data, object["actionOptions"]);
                break;
            default:
                throw new Error(`unsupported locator type:${locatorType}`);
        }
        this.loggerAttachment(`entered value '${data}' in ${this.getLocatorDescription(object)}`);
    }

    async click_ifElementExist(locatorType: 'getByLocator' | 'getByLabel' | 'getByRole' | 'getByText', object: any) {
        let isVisible: any;
        switch (locatorType) {
            case 'getByLocator':
                isVisible = await this.getByLocator(object).isVisible();
                if (isVisible) {
                    await this.getByLocator(object).click(object["actionOptions"]);
                }
                break;
            case 'getByLocator':
                isVisible = await this.getByLocator(object).isVisible();
                if (isVisible) {
                    await this.getByLocator(object).click(object["actionOptions"]);
                }
                break;
            case 'getByLocator':
                isVisible = await this.getByLocator(object).isVisible();
                if (isVisible) {
                    await this.getByLocator(object).click(object["actionOptions"]);
                }
                break;
            case 'getByLocator':
                isVisible = await this.getByLocator(object).isVisible();
                if (isVisible) {
                    await this.getByLocator(object).click(object["actionOptions"]);
                }
                break;
            case 'getByLocator':
                isVisible = await this.getByLocator(object).isVisible();
                if (isVisible) {
                    await this.getByLocator(object).click(object["actionOptions"]);
                }
                break;
            default:
                throw new Error(`unsupported locator type:${locatorType}`);
        }
        this.loggerAttachment(`click action perfomed in ${this.getLocatorDescription(object)}`);

    }


    async click(locatorType: 'getByLocator' | 'getByLabel' | 'getByRole' | 'getByText', object: any) {

        switch (locatorType) {
            case 'getByLocator':
                await this.getByLocator(object).click(object["actionOptions"]);
                break;

            case 'getByLocator':
                await this.getByLocator(object).click(object["actionOptions"]);
                break;

            case 'getByLocator':
                await this.getByLocator(object).click(object["actionOptions"]);
                break;

            case 'getByLocator':
                await this.getByLocator(object).click(object["actionOptions"]);
                break;

            case 'getByLocator':
                await this.getByLocator(object).click(object["actionOptions"]);
                break;
            default:
                throw new Error(`unsupported locator type:${locatorType}`);
        }
        this.loggerAttachment(`click action perfomed in ${this.getLocatorDescription(object)}`);

    }

    async selectDropDownOptions(locatorType: 'getByLocator', object: any) {
        switch (locatorType) {
            case 'getByLocator':
                await this.getSelectByLocator(object);
                break;

            default:
                throw new Error(`unsupported locator type:${locatorType}`);
        }
        this.loggerAttachment(`selected value in ${this.getLocatorDescription(object)}`);

    }

    async selectRadioOrCheckButton(object: any) {
        const isChecked = await this.getByLocator(object).isChecked();
        if (isChecked) {
            console.log(`Radio/CheckBox already checked`);
        } else {
            console.log(`Radio/CheckBox not checked`);
            await this.getByLocator(object).click(object["actionOptions"]);
            const isCheckedAfterClick = await this.getByLocator(object).isChecked();
            if (isCheckedAfterClick) {
                console.log(`Radio/CheckBox already checked`);
            } else {
                await this.getByLocator(object).click(object["actionOptions"]);
                const isCheckedAfterSecondClick = await this.getByLocator(object).isChecked();
                if (isCheckedAfterSecondClick) {
                    expect(isChecked).toBeTruthy();
                }
            }
        }
        this.loggerAttachment(`selected radio/check ${this.getLocatorDescription(object)}`);

    }


    //===============================================================================================

    getByLocator(object: any) {
        return this.page.locator(object["locator"], object["locatorOptions"]);
    }

    getLocatorDescription(object: any): string {
        var description = object["description"];
        return description;
    }

    getSelectByLocator(object: any) {
        return this.page.selectOption(object["locator"], object["selectorOptions"]);
    }

    getLocatorByLabel(object: any) {
        return this.page.getByLabel(object["locatorByLabel"], object["locatorOptions"]);
    }

    getLocatorByText(object: any) {
        return this.page.getByText(object["locatorByText"], object["locatorOptions"]);
    }


    getLocatorByRole(object: any) {
        const myEle = object["locator"] as
            | "alert"
            | "alertdialog"
            | "application"
            | "article"
            | "banner"
            | "blockquote"
            | "button"
            | "caption"
            | "cell"
            | "checkbox"
            | "code"
            | "columnheader"
            | "combobox"
            | "complementary"
            | "contentinfo"
            | "definition"
            | "deletion"
            | "dialog"
            | "directory"
            | "document"
            | "emphasis"
            | "feed"
            | "figure"
            | "form"
            | "generic"
            | "grid"
            | "gridcell"
            | "group"
            | "heading"
            | "img"
            | "insertion"
            | "link"
            | "list"
            | "listbox"
            | "listitem"
            | "log"
            | "main"
            | "marquee"
            | "math"
            | "meter"
            | "menu"
            | "menubar"
            | "menuitem"
            | "menuitemcheckbox"
            | "menuitemradio"
            | "navigation"
            | "none"
            | "note"
            | "option"
            | "paragraph"
            | "presentation"
            | "progressbar"
            | "radio"
            | "radiogroup"
            | "region"
            | "row"
            | "rowgroup"
            | "rowheader"
            | "scrollbar"
            | "search"
            | "searchbox"
            | "separator"
            | "slider"
            | "spinbutton"
            | "status"
            | "strong"
            | "subscript"
            | "superscript"
            | "switch"
            | "tab"
            | "table"
            | "tablist"
            | "tabpanel"
            | "term"
            | "textbox"
            | "time"
            | "timer"
            | "toolbar"
            | "tooltip"
            | "tree"
            | "treegrid"
            | "treeitem";
        return this.page.getByRole(myEle, object["locatorOptions"]);
    }
}