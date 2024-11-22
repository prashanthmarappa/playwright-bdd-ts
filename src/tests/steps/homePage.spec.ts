import { Given, When, Then } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test";
import { getPage } from "../../helper/Hooks/cucumberHooks.spec";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";

let loginPage: LoginPage;
let homePage: HomePage;

Then("I should see the expected outcome1", async function () {
  homePage = new HomePage(getPage(),this.attach);  
  this.log("I should see the expected outcome");
    console.log(`hello ${this.parameters.a}`)
  });
  