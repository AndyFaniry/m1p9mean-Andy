import * as ejs from "ejs";
import { User } from "../../collection/user/user.interface";
import { config } from "../../app/app.config";

const SIGNUP_SUCCESS_MAIL_TEMPLATE =
  "./public/email-template/signup-success.ejs";
  const CREATE_SUCCESS_MAIL_TEMPLATE =
  "./public/email-template/create-success.ejs";
class MailRender {
  async renderSignupSuccess(user: User): Promise<string> {
    return ejs.renderFile(SIGNUP_SUCCESS_MAIL_TEMPLATE, {
      user,
    });
  }
  async renderCreateSuccess(user: User,mdp: string): Promise<string> {
    return ejs.renderFile(CREATE_SUCCESS_MAIL_TEMPLATE, {
      user,mdp
    });
  }
}

export const mailRenderService = new MailRender();
