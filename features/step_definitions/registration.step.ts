import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../../pages/loginpage";
import { RegistrationPage } from "../../pages/registerpage";


Given('navigate to the demoqa registration page', async function (this:CustomWorld) {
  console.log('navigate to the demoqa registration page');
  await this.page.goto('https://adactinhotelapp.com/Register.php');
});

When('provide valid student details and submit', async function (dataTable) {
  const data = dataTable.hashes();
  console.log('*****************************')
  console.log(data[0]);
  console.log('*****************************')


  const registerPage = new RegistrationPage(this.page);
  registerPage.fillRegistration(data[1].Username, data[1].Password, data[1].FullName, data[1].email);  
  
});

Then('validate if the registration is successful', function () {
  console.log('validate if the registration is successful')
});