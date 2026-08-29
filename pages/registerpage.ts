import { Page } from 'playwright';

export class RegistrationPage {

    private readonly username;
    private readonly password;
    private readonly confirmPwd;
    private readonly fullName;
    private readonly emailAdd;

    constructor(private page: Page) {
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.confirmPwd = page.locator('#re_password')
        this.fullName = page.locator('#full_name');
        this.emailAdd = page.locator('#email_add');
    }

    async fillRegistration(user:string, pass:string, fullname:string, email:string){
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.confirmPwd.fill(pass);
        await this.fullName.fill(fullname);
        await this.emailAdd.fill(email);

    }

        
}