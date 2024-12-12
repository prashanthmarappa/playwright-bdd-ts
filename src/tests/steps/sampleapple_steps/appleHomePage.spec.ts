import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test"
import { getPage } from "../../../helper/Hooks/cucumberHooks.spec"
import AppleHomePage_ui_actions from "../../pages/sample_apple_pages/appleHome_components/appleHomePage_ui_actions";

let appleHomePage_ui_actions: AppleHomePage_ui_actions;

Given('launch apple website', async function () {
    appleHomePage_ui_actions = new AppleHomePage_ui_actions(getPage(), this.attach);
    await appleHomePage_ui_actions.pageWaitComponentsLoad();
});

Then('verify store button and click on shop', async function () {
    appleHomePage_ui_actions = new AppleHomePage_ui_actions(getPage(), this.attach);
    await appleHomePage_ui_actions.click_menu_store();
});