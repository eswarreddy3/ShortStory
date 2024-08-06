import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Category } from '../../models/category';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-poststory',
  templateUrl: './poststory.component.html',
  styles: [
  ]
})
export class PoststoryComponent implements OnInit {

  postStoryForm!: FormGroup;


  public serverErrors: string[] = [];
  public showSuccessMsg = false;
  public showFailureMsg = false;
  public successMsg: string = "";
  categories: Category[] = [];


  getCategories() {
    return this.api.getCategories().subscribe(res => {
      this.categories = res;
    });
  }
  constructor(private fb: FormBuilder,
    private api: ApiService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getCategories();

    this.postStoryForm = this.fb.group({
      ssTitle: ["", Validators.required],
      ssDescription: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  get ssForm() {
    return this.postStoryForm.controls;
  }

  postStory() {
    console.log(this.postStoryForm.value);
    this.api.postStory(this.postStoryForm.value).subscribe(
      res => {
      },
      err => {
        this.serverErrors = [];
        if (err.status === 400) {
          Object.keys(err.error.errors).forEach(key => {
            this.serverErrors.push(err.error.errors[key][0]);
          });
        }
        else if (err.status === 500) {
          console.log(err);
          this.serverErrors.push(err.error);
        }
        else if (err.status === 0) {
          console.log(err);
          this.serverErrors.push("API Service seems to be down.");
        }
        else {
          this.serverErrors.push(err.message);
        }
        this.showFailureMsg = true;
        this.showSuccessMsg = false;
      },
      () => {
        this.postStoryForm.reset();
        this.successMsg = "Story Posted Successfully!";
        this.showFailureMsg = false;
        this.showSuccessMsg = true;
        setTimeout(() => {
          this.showSuccessMsg = false;
        }, 5000);
      }
    );
  }
}
