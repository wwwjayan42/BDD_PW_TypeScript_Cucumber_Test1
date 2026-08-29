import { Page } from 'playwright';

export class LoginPage {

    private readonly username;
    private readonly password;
    private readonly loginButton;
    readonly registerLink;

    constructor(private page: Page) {
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.registerLink = page.locator('a[href="Register.php"]');
    }

    async login(username: string, password: string) : Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        // await this.page.waitForTimeout(2000);
        await this.loginButton.click();
    }

    async navigateRegistration(){
        await this.registerLink.click();
    }
}