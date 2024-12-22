import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test"
import { getPage } from "../../../helper/Hooks/cucumberHooks.spec"
import AppleHomePage_ui_actions from "../../pages/sample_apple_pages/appleHome_components/appleHomePage_ui_actions";
import AppleHomePage_ui_assert from "../../pages/sample_apple_pages/appleHome_components/appleHomePage_ui_assert";
import AppleHomePage_network from "../../pages/sample_apple_pages/appleHome_components/appleHomePage_network";
import AppleHomePage_api_assert from "../../pages/base_pages/apiAssertBasePage";
import AppleHomePage_ui_assert_screenShot from "../../pages/base_pages/uiAssertScreenshotBasePage";

let appleHomePage_ui_actions: AppleHomePage_ui_actions;
let appleHomePage_ui_assert: AppleHomePage_ui_assert;
let appleHomePage_network: AppleHomePage_network;
let appleHomePage_api_assert: AppleHomePage_api_assert;
let appleHomePage_ui_assert_screenShot: AppleHomePage_ui_assert_screenShot;

let flyout_json_response: any;

Given('launch apple website', async function () {
    appleHomePage_ui_actions = new AppleHomePage_ui_actions(getPage(), this.attach);
    appleHomePage_ui_assert_screenShot = new AppleHomePage_ui_assert_screenShot(getPage(), this.attach);
    await appleHomePage_ui_actions.pageWaitComponentsLoad();
    
    await appleHomePage_ui_actions.pageScreenshot('homepage');
   // await expect(getPage()).toHaveScreenshot('a.png');
    //await appleHomePage_ui_assert_screenShot.compareFullPageScreenShots('homepage');

   // await appleHomePage_ui_assert_screenShot.compareScreenshot('homepage');

    this.log("Home Page Launched");
});

Then('verify store button and click on shop', async function () {
    appleHomePage_ui_actions = new AppleHomePage_ui_actions(getPage(), this.attach);
    appleHomePage_ui_assert = new AppleHomePage_ui_assert(getPage(), this.attach);
    appleHomePage_network = new AppleHomePage_network(getPage(), this.attach);
    appleHomePage_api_assert = new AppleHomePage_api_assert(getPage(), this.attach);
    await appleHomePage_ui_assert.uiAssertStoreMenu();
    await appleHomePage_ui_actions.click_menu_store();
    flyout_json_response = await appleHomePage_network.getFlyOutStoreItems(`**/global-elements/global-header/v1/flyouts?locale=en_US`);
    const sample = await appleHomePage_network.getNameJsonValue(flyout_json_response);
    console.log(sample);
    await appleHomePage_api_assert.assertJsonAttributeKey(flyout_json_response[0], 'name');
    await appleHomePage_api_assert.assertJsonAttributeMatchObject(flyout_json_response[0], 'analyticsAttributes[0]', { name: "data-analytics-title", value: "apple home" });
    //await expect(flyout_json_response).toHaveProperty("[0].analyticsAttributes[0].value", "apple home");
    await appleHomePage_api_assert.assertJsonAttributeValue(flyout_json_response[0], 'analyticsAttributes[0].value',"apple home");
});