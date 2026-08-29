import { Given, When, Then } from "@cucumber/cucumber";

Given('Navigate to product page and login', function () {
  console.log('Navigate to product page and login')
});

When('provide valid {string} and {string} then submit order', function (string, string2) {
  console.log(string);
  console.log(string2)
});

Then('validate if the order placement is successful', function () {
  console.log('validate if the order placement is successful')
});

When('search the {string} and add to cart', function (product) {
  console.log(product)
});

When('provide valid {string} for shipping then submit', function (address) {
  console.log(address)
});