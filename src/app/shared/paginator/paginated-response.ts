export interface PaginatedResponse {
  data: any[],
  current_page: number,
  last_page: number,
  per_page: number,
  from: number,
  to: number,
  total: number,
  path: string,
  next_page_url: string,
  prev_page_url: string,
};
