import { Accessibility, Page, Response } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import Log from "../../../helper/config/logConfig";

let accessibilityResults, violations;

export default class accessibilityBasePage {
    protected page: Page;
    protected loggerAttachment: ICreateAttachment;
    constructor(page: Page, loggerAttachment: ICreateAttachment) {
        this.page = page;
        this.loggerAttachment = loggerAttachment;
    }

    async accessibilityScanPage() {
        try {
            accessibilityResults = await new AxeBuilder({ page: this.page }).withTags(['wcag2a']).analyze();
            this.logAccessibilityViolations(accessibilityResults);
            this.checkViolation(accessibilityResults);
            return accessibilityResults;
        } catch (error) {
            Log.error(`${error}`);
            throw new Error(`${error}=`);

        }
    }

    async accessibilityCheckForElement(object: any) {
        try {
            accessibilityResults = await new AxeBuilder({ page: this.page }).include(object["locator"]).analyze();
            this.logAccessibilityViolations(accessibilityResults);
            this.checkViolation(accessibilityResults);
            return accessibilityResults;
        } catch (error) {
            Log.error(`${error}`);
            throw new Error(`${error}=`);

        }
    }

    async accessibilityCheckForSpeechRecognition() {
        const snapshot = await this.page.accessibility.snapshot();
        return snapshot;
    }

    async accessibilityCheckAttributeNames(object: any, expectedRole: string) {
        const locator = this.page.locator(object["locator"]);
        const count = await locator.count();
        for (let i = 0; i < count; i++) {
            const element = locator.nth(i);
            const role = await element.getAttribute('role');
            const accessibilityName = await element.getAttribute('aria-label') || await element.getAttribute('aria-labelledby');
            const elementType = await element.evaluate(node => node.tagName);
            console.log(`element type: ${elementType}`);
            console.log(`expected role: ${expectedRole}, Actual Role: ${role}`);
            console.log(`accessible name: ${accessibilityName}`);
            console.log(`==============================`);
        }

    }

    checkViolation(accessibilityResults: any) {
        if (accessibilityResults.violations.length > 0) {
            throw new Error("Accessibility violaitons were found. check the execution reports for details");
        }
    }

    logAccessibilityViolations(accessibilityResults: any) {
        let count = 0;
        violations = accessibilityResults.violations;
        if (violations.length <= 0) {
            this.loggerAttachment(`no accessibility violations`);
        }
        violations.forEach((violation: any) => {
            this.loggerAttachment(`\n****************************\n`);
            this.loggerAttachment(`violation:${violation.id}`);
            this.loggerAttachment(`Impact:${violation.impact}`);
            this.loggerAttachment(`Description:${violation.description}`);
            this.loggerAttachment(`WCAG Rules: ${violation.tags.join(',')}`);
            this.loggerAttachment(`Elements causing the issue`);
            violation.nodes.forEach((node: any) => {
                count++;
                this.loggerAttachment(`\n***********violations count ==> ${count}*****************\n`);
                this.loggerAttachment(`- HTML:${node.html}`);
                this.loggerAttachment(`- Name:${node.target}`);
                this.loggerAttachment(`- Failure Summary:${node.failuresummary}`);
                this.loggerAttachment(`\n****************************\n`);
            });
            this.loggerAttachment(`\n****************************\n`);
        });
    }

}