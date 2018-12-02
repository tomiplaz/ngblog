import { MessageService } from "../app/core/message.service";

export const messageServiceStub: Partial<MessageService> = {
  createAccountSuccess: () => {},
  loginSuccess: () => {},
  createPostSuccess: () => {},
  createCommentSuccess: () => {},
  error: (response: any) => {},
}
