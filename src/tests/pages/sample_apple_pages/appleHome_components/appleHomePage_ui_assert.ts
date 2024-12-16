import { Page, Locator } from "playwright";
import * as AppleHomePage_Locators from "../../../locators/appleHomePageLocators.json";
import uiBasePage from "../../base_pages/uiBasePage";
import networkBasePage from "../../base_pages/networkBasePage";
import uiAssertBasePage from "../../base_pages/uiAssertBasePage";
import accessibilityBasePage from "../../base_pages/accessibilityBasePage";;
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class appleHomePage_ui_assert extends uiAssertBasePage {
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        super(page, loggerAttachment);
    }

    async uiAssertStoreMenu() {
        try {
            await this.expectedLabelToBeVisible(AppleHomePage_Locators.menu_button_store, true);
        } catch (error) {
            throw new Error(`assertion failed for apple home page to verify menu button Store : ${error}`);

        }
    }

}