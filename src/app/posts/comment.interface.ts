export interface Comment {
    id?: number,
    post_id: number,
    user_id: number,
    text: string,
    created_at?: string,
    updated_at?: string,
}