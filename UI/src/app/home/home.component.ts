import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { ChartData } from 'chart.js';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  imageToShow: any;
  pending: number = 0;
  approved: number = 0;

  storiesBar: ChartData<'bar'> = {
    datasets: []
  };

  storiesPie: ChartData<'pie'> = {
    datasets: []
  };

  constructor(public authService: AuthService, public api: ApiService, public localStorage: LocalStorageService) { }

  ngOnInit(): void {
    if (this.localStorage.get("Obj")) {

      this.authService.getProfilePic().subscribe(res => {
        let reader = new FileReader();
        reader.addEventListener("load", x => { this.imageToShow = reader.result; });
        reader.readAsDataURL(res);
      });

      this.api.getStories().subscribe(res => {

        if (this.localStorage.get("Obj").role === 'Admin') {
          this.pending = res.filter(x => x.isApproved === false).length;
          this.approved = res.filter(x => x.isApproved === true).length;
        }
        else {
          this.pending = res.filter(x => x.isApproved === false && x.id === this.localStorage.get("Obj").id).length;
          this.approved = res.filter(x => x.isApproved === true && x.id === this.localStorage.get("Obj").id).length;
        }

        this.storiesBar = {
          labels: ['Stories'],
          datasets: [
            { label: 'Pending', data: [this.pending] },
            { label: 'Approved', data: [this.approved] }
          ],
        };
        this.storiesPie = {
          labels: ['Pending', 'Approved'],
          datasets: [{ data: [this.pending, this.approved] }]
        };
      });

    }
  }

}
