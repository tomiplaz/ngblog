export interface Post {
    id?: number,
    string_id?: string,
    user_id: number,
    title: string,
    content: string,
    created_at?: string,
    updated_at?: string,
    tags?: object[],
}
