import { Page, Locator } from "playwright";
import * as AppleHomePage_Locators from "../../../locators/appleHomePageLocators.json";
import uiBasePage from "../../base_pages/uiBasePage";
import networkBasePage from "../../base_pages/networkBasePage";
import AssertBasePage from "../../base_pages/uiAssertBasePage";
import apiAssertBasePage from "../../base_pages/apiAssertBasePage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class appleHomePage_api_assert extends apiAssertBasePage {
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        super(page, loggerAttachment);
    }

}