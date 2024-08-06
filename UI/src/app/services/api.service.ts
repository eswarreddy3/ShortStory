import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Category } from '../models/category';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = "http://localhost:5041/api";

  constructor(private api: HttpClient, public localStorage: LocalStorageService) { }

  //Stories

  getStories() {
    return this.api.get<Story[]>(this.baseUrl + "/stories");
  }

  postStory(story: Story) {
    return this.api.post<Story>(this.baseUrl + "/stories", story);
  }

  getStoriesByStatus(isApproved: boolean) {
    return this.api.get<Story[]>(this.baseUrl + "/stories/getStoriesByStatus/" + isApproved);
  }

  approveStory(story: Story) {
    return this.api.put<Story>(this.baseUrl + "/stories/approveStory/" + story.ssId, story);
  }

  getStoriesByUserId(id: string) {
    return this.api.get<Story[]>(this.baseUrl + "/stories/getStoriesByUserId/" + id);
  }

  //Category
  getCategories() {
    return this.api.get<Category[]>(this.baseUrl + "/categories");
  }

  postCategory(category: Category) {
    return this.api.post<Story>(this.baseUrl + "/categories", category);
  }
}
