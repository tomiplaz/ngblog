import { Post } from '../post.interface';

export abstract class PostFormInterface {
    abstract submitHandler(post: Post): void;
}
