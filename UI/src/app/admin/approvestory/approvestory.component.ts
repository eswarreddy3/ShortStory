import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-approvestory',
  templateUrl: './approvestory.component.html',
  styles: [
  ]
})
export class ApprovestoryComponent implements OnInit {

  stories: Story[] = [];
  search: string = "";
  p: number = 1;

  getStoriesByStatus(isApproved: boolean) {
    return this.api.getStoriesByStatus(isApproved).subscribe(res => {
      this.stories = res;
    });
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getStoriesByStatus(false);
  }

  approveStory(story: Story) {
    if (confirm("Are you sure to approve?")) {
      this.api.approveStory(story).subscribe(res => {
        alert("Story approved Successfully");
        this.getStoriesByStatus(false);
      });
    }
  }

}
