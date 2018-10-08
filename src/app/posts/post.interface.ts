import { User } from '../users/user.interface';
import { Comment } from './comment.interface'; 
import { Tag } from './tag.interface';

export interface Post {
    id?: number,
    string_id?: string,
    user_id: number,
    title: string,
    content: string,
    created_at?: string,
    updated_at?: string,
    user?: User,
    comments?: Comment[],
    tags?: Tag[],
}
