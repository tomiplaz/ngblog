import { User } from '../users/user.interface';
import { Comment } from './comment.interface';
import { Tag } from './tag.interface';

export interface Post {
  id?: number;
  key?: string;
  user_id: number;
  title: string;
  content: string;
  views_count?: number;
  comments_count?: number;
  created_at?: string;
  updated_at?: string;
  user?: User;
  comments?: Comment[];
  tags?: Tag[];
}
