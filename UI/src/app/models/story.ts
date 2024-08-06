import { Category } from "./category";
import { Ssuser } from "./ssuser";

export interface Story {
  ssId: number;
  ssTitle: string;
  ssDescription: string;
  createdOn: string;
  isApproved: boolean;
  like: number;
  dislike: number;
  id?: string;
  categoryId?: string;
  ssUser?: Ssuser;
  category: Category;
}
