import {Given, When, Then} from '@cucumber/cucumber';
import {CustomWorld} from '../support/world';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';

Given('navigate to application website', async function (this: CustomWorld) {
  console.log('navigate to application website');
  await this.page.goto('https://www.saucedemo.com/');
});

When('provide valid username and password then hit login', async function (this: CustomWorld) {
  console.log('provide valid username and password then hit login');
  // await this.page.locator('#user-name').fill('standard_user');
  // await this.page.locator('#password').fill('secret_sauce');
  // await this.page.locator('#login-button').click();

  const loginPage = new LoginPage(this.page);
  loginPage.login('standard_user', 'secret_sauce');
});

Then('validate if the user login is successful', async function (this: CustomWorld) {
  console.log('validate if the user login is successful');
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

When('provide invalid username and password then hit login', async function (this: CustomWorld) {
  console.log('provide invalid username and password then hit login');
  // await this.page.locator('#user-name').fill('standard_user');   //without page object model
  // await this.page.locator('#password').fill('secret_sauce12');
  // await this.page.locator('#login-button').click();

  const loginPage = new LoginPage(this.page);
  loginPage.login('standard_user', 'secret_sauce12');
});

Then('validate if the user login is unsuccessful', async function (this: CustomWorld) {
  console.log('validate if the user login is unsuccessful');
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

Given('click on forgot password link', function (this: CustomWorld) {
  console.log('click on forgot password link');
});

When('provide new password and reconfirm password', function (this: CustomWorld) {
  console.log('provide new password and reconfirm password');
});

When('generate otp and submit then hit change password', function (this: CustomWorld) {
  console.log('generate otp and submit then hit change password');
});

Then('validate if the password change is successful', function (this: CustomWorld) {
  console.log('validate if the password change is successful');
});

Then('try relogin with new credential', function (this: CustomWorld) {
  console.log('try relogin with new credential')
});

When('provide valid {string} and {string} then hit login', async function (this: CustomWorld, user, pass) {
  const loginPage = new LoginPage(this.page);
  loginPage.login(user, pass);
  // await this.page.waitForTimeout(2000);
});