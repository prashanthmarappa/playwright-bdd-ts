import basePage from "./basePage";
import { Page } from "playwright";
import { ICreateLog,ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";


export default class homePage extends basePage {
 
    constructor(page: Page,loggerAttachment:ICreateAttachment) {
     super(page,loggerAttachment);
    }
}