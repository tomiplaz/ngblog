import { Post } from '../posts/post.interface';

export interface HomeData {
  posts: {
    recent: Post[];
    random: Post[];
  };
  stats: Stats;
}

export interface Stats {
  users_count: number;
  posts_count: number;
  comments_count: number;
}
