export interface IPostSearch {
  page?: number;
  limit?: number;
  published?: string;
  searchKeyword?: string;
  startTime?: string;
  endTime?: string;
}
export interface IPost {
  id: string;
  avatar: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  tags: any[];
  numberOfRead?: number;
  publishedAt: Date;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostData {
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
}
