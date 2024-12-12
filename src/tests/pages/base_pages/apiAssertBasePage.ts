import { Page, Response } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';
import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import Log from "../../../helper/config/logConfig";

export default class apiAssertBasePage {
    protected page: Page;
    protected loggerAttachment: ICreateAttachment;
    protected ajv: Ajv;
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        this.page = page;
        this.loggerAttachment = loggerAttachment;
        this.ajv = new Ajv();
    }

    async assertJsonAttributeKey(json: any, key: any, visible: boolean = true) {
        try {
            if (visible) {
                await expect(json).toHaveProperty(key);
            } else {
                await expect(json).not.toHaveProperty(key);
            }
        } catch (error) {
            throw new Error(`Expected==>${key}, but got ==> ${json[key]}`);

        }
    }

    async assertJsonAttributeNatchObject(json: any, jsonPath: string, jsonExpectedObject: any, visible: boolean = true) {
        const keys = jsonPath.replace(/\[(\d+|any)]/g, `.$1`).split('.');
        let current = json;
        let traversedPath = '';
        for (const key of keys) {
            traversedPath += traversedPath ? `.${key}` : key;
            if (current[key] === undefined) {
                throw new Error(`property "${key}" not found in json path "${traversedPath}". Found ${this.getJsonStringToDisplay(current)}`);


            }
            current = current[key];
        }
        try {
            if (visible) {
                await expect(current).toMatchObject(jsonExpectedObject);
            } else {
                await expect(current).not.toMatchObject(jsonExpectedObject);
            }
        } catch (error) {
            throw new Error(`value mismatch at path "${jsonPath}"\n. Expected==>"${this.getJsonStringToDisplay(jsonExpectedObject)}"\n, but found :${this.getJsonStringToDisplay(current)}`);

        }
    }

    async assertJsonAttributeValue(json: any, jsonAttributeKey: string, jsonExpectedAttributeValue: any, visible: boolean = true) {
        const actualValue = this.getValueByPath(json, jsonAttributeKey);
        let matched = false;
        let foundValue: any;
        for (const [index, value] of actualValue.values.entries()) {
            foundValue = value;
            if (value === jsonExpectedAttributeValue) {
                matched = true;
                await expect(value.toBe(jsonExpectedAttributeValue))
            }
        }
        if (!matched) {
            if (!visible) {
                await expect(foundValue).toBe(jsonExpectedAttributeValue)
            }
            throw new Error(`Expected Value===> ${jsonExpectedAttributeValue}, not found in path ${jsonAttributeKey}`);

        }

    }

    async assertJsonAttributeValueNotExist(json: any, jsonAttributeKey: string, jsonExpectedAttributeValue: any) {
        const actualValue = this.getValueByPath(json, jsonAttributeKey);
        let matched = false;
        let foundValue: any;
        for (const [index, value] of actualValue.values.entries()) {
            foundValue = value;
            if (value === jsonExpectedAttributeValue) {
                matched = true;
                await expect(value.not.toBe(jsonExpectedAttributeValue))
            }
        }
        if (matched === true) {
            throw new Error(`Expected Value===> ${jsonExpectedAttributeValue}, not found in path ${jsonAttributeKey}`);
        }
    }

    async assertApiStatus(response: Response, expectedStatus: number): Promise<void> {
        let actualStatus;
        try {
            actualStatus = response.status();
            await expect(actualStatus).toBe(expectedStatus);
        } catch (error) {
            throw new Error(`Expected status===> ${expectedStatus}, but got ${actualStatus}`);
        }
    }

    async assertJsonAttributeType<T>(json: T, key: keyof T, expectedType: string): Promise<void> {
        const actualType = typeof json[key];
        if (actualType !== expectedType) {
            throw new Error(`Expected type for ===> "${String(key)}" to be ==>"${expectedType}", but got ===>${actualType}`);

        }

    }

    async validateResponseFromSchemaFile<T>(response: Response, schemaPath: string): Promise<void> {
        if (!response.ok()) {
            throw new Error(`API response failed with status : ${response.status()}`);

        }
        const jsonResponse = await response.json();
        const schema = this.loadSchema<T>(schemaPath);
        this.validateResponse(schema, jsonResponse);
    }

    loadSchema<T>(schemaPath: string): JSONSchemaType<T> {
        const absolutePath = path.resolve(schemaPath);
        const schemaData = fs.readFileSync(absolutePath, `utf-8`);
        return JSON.parse(schemaData) as JSONSchemaType<T>;
    }

    validateResponse<T>(schema: JSONSchemaType<T>, jsonResponse: any): void {
        const validate: ValidateFunction<T> = this.ajv.compile(schema);
        if (!validate(jsonResponse)) {
            const errors = validate.errors?.map(error => `${error.instancePath}===>${error.message}`);
            throw new Error(`schema validation failed: ${errors}`);
        }
    }

    getJsonStringToDisplay<T>(json: T) {
        let jsonConvert: any = json;
        let printJson: string;
        printJson = JSON.stringify(jsonConvert, null, 2);
        return printJson;
    }

    getValueByPath<T>(json: T, path: string): { values: any[]; indices: number[] } {
        const keys = path.replace(/\[(\d+|any)]/g, `.$1`).split('.');
        let acc: any = json;
        const results: any[] = [];
        const indices: number[] = [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key === "any") {
                keys.length - 1;
                if (!Array.isArray(acc)) {
                    throw new Error("'any' used in path, but current node is not array");
                }
                for (let index = 0; index < acc.length; index++) {
                    const item = acc[index];
                    try {
                        const result = this.getValueByPath(item, keys.slice(i + 1).join('.'));
                        results.push(...result.values);
                        console.log(result.values);
                        indices.push(index);
                    } catch {
                        throw new Error("failed");

                    }
                }
                if (results.length === 0) {
                    throw new Error(`no matching node found at json path "${path}" in an array element`);

                }
            }
            else if (!isNaN(Number(key))) {
                acc = acc[Number(key)];
                if (acc === undefined) {
                    throw new Error(`Array index "${key}" not found in json path "${path}"`);

                }
            } else {
                if (i == keys.length - 1) {
                    if (acc && acc[key] !== undefined) {
                        results.push(acc[key]);
                    }
                } else {
                    acc = acc[key];
                    if (acc === undefined) {
                        throw new Error(`property "${key}" not found in json path "${path}"`);

                    }
                }
            }
        }
        return { values: results, indices };
    }
}