export interface User {
  id?: number,
  string_id?: string,
  name: string,
  email: string,
  about?: string,
  website?: string,
  password?: string,
  posts_count?: number,
  comments_count?: number,
  created_at?: string,
  updated_at?: string,
}

export interface UpdateUser {
  website?: string,
  about?: string,
}

export interface ChangePassword {
  currentPassword: string,
  newPassword: string,
}
