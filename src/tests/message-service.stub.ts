import { MessageService } from '../app/core/message.service';

export const messageServiceStub: Partial<MessageService> = {
  createAccountSuccess: () => {},
  confirmAccountSuccess: () => {},
  loginSuccess: () => {},
  logoutSuccess: () => {},
  createPostSuccess: () => {},
  createCommentSuccess: () => {},
  updateMyProfileSuccess: () => {},
  changePasswordSuccess: () => {},
  forgotPasswordEmailSent: () => {},
  forgotPasswordEmailRequired: () => {},
  resetPasswordSuccess: () => {},
  error: (response: any) => {},
};
