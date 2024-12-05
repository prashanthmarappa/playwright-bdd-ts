import { Locator, Page, Response } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "@playwright/test";
import Log from "../../../helper/config/logConfig";

export default class uiAssertBasePage {
    protected page: Page;
    protected loggerAttachment: ICreateAttachment;
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        this.page = page;
        this.loggerAttachment = loggerAttachment;
    }

    async expectedRoleToBeVisible(object: any, visible: boolean = true) {
        if (visible) {
            await expect(this.getLocatorByRole(object)).toBeVisible();
            this.loggerAttachment(`Expecting exact role: '${object["locatorByRole"]}' for ${this.getLocatorDescription(object)} to be visible`)
        } else {
            await expect(this.getLocatorByRole(object)).not.toBeVisible();
            this.loggerAttachment(`Expecting exact role: '${object["locatorByRole"]}' for ${this.getLocatorDescription(object)} not to be visible`)

        }
    }

    async expectedTextToBeVisible(object: any, visible: boolean = true) {
        if (visible) {
            await expect(this.getLocatorByText(object)).toBeVisible();
            this.loggerAttachment(`Expecting exact Text: '${object["locatorByText"]}' for ${this.getLocatorDescription(object)} to be visible`)
        } else {
            await expect(this.getLocatorByText(object)).not.toBeVisible();
            this.loggerAttachment(`Expecting exact Text: '${object["locatorByText"]}' for ${this.getLocatorDescription(object)} not to be visible`)

        }
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