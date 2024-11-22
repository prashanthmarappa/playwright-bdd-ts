import { Given, When, Then } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test";
import { getPage } from "../../helper/Hooks/cucumberHooks.spec";
import LoginPage from "../pages/loginPage";

let loginPage: LoginPage;

Given("I have a precondition", async function () {
  loginPage = new LoginPage(getPage(),this.attach);
  await loginPage.goToPage();
  //expect
  this.log("I have a precondition");
  this.parameters.a=10;
  
});

When("I perform an action", async function () {
  loginPage = new LoginPage(getPage(),this.attach);
  await loginPage.loginUsername();
  this.log("I perform an action steps logs");
});

Then("I should see the expected outcome", async function () {
  this.log("I should see the expected outcome");
  console.log(`hello ${this.parameters.a}`)
});
