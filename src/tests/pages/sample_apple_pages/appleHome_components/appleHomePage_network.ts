import { Page, Locator } from "playwright";
import * as AppleHomePage_Locators from "../../../locators/appleHomePageLocators.json";
import uiBasePage from "../../base_pages/uiBasePage";
import networkBasePage from "../../base_pages/networkBasePage";
import AssertBasePage from "../../base_pages/uiAssertBasePage";
import accessibilityBasePage from "../../base_pages/accessibilityBasePage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class appleHomePage_network extends networkBasePage {
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        super(page, loggerAttachment);
    }
    //https://www.apple.com/api-www/global-elements/global-header/v1/flyouts?locale=en_US

    async getFlyOutStoreItems(url: string) {
        return await this.getPageNetworkResponseBodyAfterPageReload(url);
    }

    async getIDJsonValue(json: any): Promise<any> {
        const jsonVal = await this.getJsonAttributeValue(json);
        return jsonVal.id;
    }

    async getResponseAfterButtonClicked(url: string, object: any) {
        return await this.getPageNetworkResponseBodyAfterButtonClick(url, object);
    }


    async getResponseAfterButtonClickedCheckForMultipleResponse(url: string, object: any, jsonPath: any, jsonResponseValue: string) {
        return await this.getPageNetworkResponseBodyAfterButtonClickWaitingForJsonValue(url, object, jsonPath, jsonResponseValue);
    }

    async mockFlyOutData(url: string, payload: string) {
        return await this.mockResponse(url, payload);
    }

    async mockFlyOutDataChangeJsonValue(url: string, payload: string, change1: string, change2: string, change3: string) {
        return await this.mockResponseChangeJson(url, payload, change1, change2, change3);
    }
}