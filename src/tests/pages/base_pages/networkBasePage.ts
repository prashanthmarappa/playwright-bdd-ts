import { Accessibility, Page, Response } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "@playwright/test";
import * as fs from 'fs';
import Log from "../../../helper/config/logConfig";

let fetch_payloadData: any;

export default class networkBasePage {
    protected page: Page;
    protected loggerAttachment: ICreateAttachment;
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        this.page = page;
        this.loggerAttachment = loggerAttachment;
    }

    async networkResponseWait(url: string) {
        await this.page.waitForResponse(url);
        this.loggerAttachment(`Response loaded for ${url}`);
    }

    async waitForUrlToLoad(url: string) {
        await this.page.waitForURL(url);
        this.loggerAttachment(`Url loaded for ${url}`);
    }


    async getPageNetworkResponseBodyAfterPageReload(url: string) {
        let message, jsonVal;
        await this.page.route(url, async route => {
            this.getFulFilledResponse(url);
            const response = await route.fetch();
            message = await response.json();
            jsonVal = JSON.stringify(message, null, 2);
            route.continue();
        });
        await this.page.reload();
        this.loggerAttachment(`\n***********************START********************\n`);
        this.loggerAttachment(`\n***********************${url}********************\n`);
        this.loggerAttachment(`Response value====> ${jsonVal}`);
        this.loggerAttachment(`\n***********************END********************\n`);
        return message;

    }

    async mockResponse(url: string, mockPayload: string) {

        let message, jsonVal, mockJsonVal;
        const mockData = JSON.parse(fs.readFileSync(mockPayload, 'utf-8'));
        await this.page.route(url, async route => {
            this.getFulFilledResponse(url);
            const response = await route.fetch();
            const originalHeaders = response.headers();
            message = await response.json();
            jsonVal = JSON.stringify(message, null, 2);
            mockJsonVal = JSON.stringify(mockData, null, 2);
            await route.fulfill({
                status: response.status(),
                contentType: originalHeaders['content-type'] || 'application/json',
                body: JSON.stringify(mockData),
            })
        });
        await this.page.reload();
        this.loggerAttachment(`\n***********************START********************\n`);
        this.loggerAttachment(`\n***********************${url}********************\n`);
        this.loggerAttachment(`Original Response value====> ${jsonVal}`);
        this.loggerAttachment(`\n***********************mock data********************\n`);
        this.loggerAttachment(`Mock Response value====> ${mockJsonVal}`);
        this.loggerAttachment(`\n***********************END********************\n`);
        return message;

    }


    async mockResponseChangeJson(url: string, mockPayload: string, change1: string, change2: string, change3: string) {

        let message, jsonVal, mockJsonVal;
        const mockData = JSON.parse(fs.readFileSync(mockPayload, 'utf-8'));
        await this.page.route(url, async route => {
            this.getFulFilledResponse(url);
            const response = await route.fetch();
            const originalHeaders = response.headers();
            message = await response.json();
            jsonVal = JSON.stringify(message, null, 2);
            mockJsonVal = JSON.stringify(mockData, null, 2);
            await route.fulfill({
                status: response.status(),
                contentType: originalHeaders['content-type'] || 'application/json',
                body: JSON.stringify(mockData),
            })
        });
        await this.page.reload();
        this.loggerAttachment(`\n***********************START********************\n`);
        this.loggerAttachment(`\n***********************${url}********************\n`);
        this.loggerAttachment(`Original Response value====> ${jsonVal}`);
        this.loggerAttachment(`\n***********************mock data********************\n`);
        this.loggerAttachment(`Mock Response value====> ${mockJsonVal}`);
        this.loggerAttachment(`\n***********************END********************\n`);
        return message;

    }

    async getPageNetworkResponseBodyAfterButtonClick(url: string, object: any) {
        let responseBody, jsonVal;
        const responsePromise = this.getFulFilledResponse(url);
        await this.getByLocator(object).click(object["actionOptions"]);
        const response = await responsePromise;
        fetch_payloadData = response.request().postDataJSON();
        console.log(await response.request().postData());
        responseBody = await response.json();
        jsonVal = JSON.stringify(responseBody, null, 2);
        this.loggerAttachment(`\n***********************START********************\n`);
        this.loggerAttachment(`\n***********************${url}********************\n`);
        this.loggerAttachment(`Response value====> ${jsonVal}`);
        this.loggerAttachment(`\n***********************END********************\n`);
        return responseBody;
    }

    async getPageNetworkResponseBodyAfterButtonClickWaitingForJsonValue(url: string, object: any, jsonPath: any, jsonResponseValue: string) {
        let message, jsonVal;
        const responsePromise = this.getFulFilledResponseUntilJsonValueSeen(url, jsonPath, jsonResponseValue);
        await this.getByLocator(object).click(object["actionOptions"]);
        const response = await responsePromise;
        message = await response.json();
        jsonVal = JSON.stringify(message, null, 2);
        this.loggerAttachment(`\n***********************START********************\n`);
        this.loggerAttachment(`\n***********************${url}********************\n`);
        this.loggerAttachment(`Response value====> ${jsonVal}`);
        this.loggerAttachment(`\n***********************END********************\n`);
        return message;
    }


    getByLocator(object: any) {
        return this.page.locator(object["locator"], object["locatorOptions"]);
    }

    async getFulFilledResponse(url: string) {
        return this.page.waitForResponse(url);
    }

    async getJsonAttributeValue(json: any) {
        const jsonVal = JSON.parse(JSON.stringify(json, null, 2));
        return jsonVal;
    }
    async getFulFilledResponseUntilJsonValueSeen(url: string, jsonPath: any, jsonResponseValue: string) {
        return this.page.waitForResponse(async (res) => {
            if (!res.url().includes(url)) {
                return false;
            }
            console.log(`monitoring response for ${url} ====> checking value ${jsonResponseValue}`);
            const responseBody = await res.json();
            return responseBody.jsonPath === jsonResponseValue;
        })
    }

    /**
     * getPageNetworkResponseBodyAfterButtonClick(url:string,object:any) loads data from this second call
     * @param url 
     * @returns 
     */
    async getRequestBodyDataAfterClick(url: string) {
        let jsonVal;
        jsonVal = JSON.stringify(fetch_payloadData, null, 2);
        this.loggerAttachment(`\n***********************START********************\n`);
        this.loggerAttachment(`\n***********************${url}********************\n`);
        this.loggerAttachment(`Response value====> ${jsonVal}`);
        this.loggerAttachment(`\n***********************END********************\n`);
        return fetch_payloadData;
    }

}