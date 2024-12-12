import { Page, Locator } from "playwright";
import * as AppleHomePage_Locators from "../../../locators/appleHomePageLocators.json";
import uiBasePage from "../../base_pages/uiBasePage";
import networkBasePage from "../../base_pages/networkBasePage";
import AssertBasePage from "../../base_pages/uiAssertBasePage"
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class appleHomePage_ui_actions extends uiBasePage {
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        super(page, loggerAttachment);
    }

    async click_menu_store() {
        try {
            await this.pageWaitComponentsLoad();
            await this.click(`getByLabel`, AppleHomePage_Locators.menu_button_store);
        } catch (error) {
            throw new Error(`check the object propert menu_button_store, failed to click on store button in home page\n ${error}`);

        }
    }
}