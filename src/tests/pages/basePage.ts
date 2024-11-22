import { Page } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class basePage {
  protected page: Page;
  protected loggerAttachment:ICreateAttachment;
  constructor(page: Page, loggerAttachment:ICreateAttachment) {
    this.page = page;
    this.loggerAttachment=loggerAttachment;
  }

  async enter(object: any, data: string) {
    await this.getLocator(object).fill(data, object["actionOptions"]);
    this.loggerAttachment(`entered value in ${this.getLocatorDescription(object)}`);
  }

  async click(object: any, roleFlag = false) {
    if (!roleFlag) {
      await this.getLocator(object).click(object["actionOptions"]);
    } else {
      await this.getLocatorByRole(object).click(object["actionOptions"]);
    }
    this.loggerAttachment(`entered value in ${this.getLocatorDescription(object)}`);
  }

  async scroll() {}

  async clickByRole(object: any) {
    await this.getLocator(object).click(object["actionOptions"]);
    this.loggerAttachment(`entered value in ${this.getLocatorDescription(object)}`);
  }

  //===============================================================================================

  getLocator(object: any) {
    return this.page.locator(object["locator"], object["locatorOptions"]);
  }

  getLocatorDescription(object: any): string {
    var description = object["description"];
    return description;
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
