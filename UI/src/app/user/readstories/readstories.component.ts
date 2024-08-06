import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { ApiService } from '../../services/api.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';


@Component({
  selector: 'app-readstories',
  templateUrl: './readstories.component.html',
  styles: [
  ]
})
export class ReadstoriesComponent implements OnInit {

  constructor(private api: ApiService) { }

  public p: number = 1;
  public search: string = "";
  stories: Story[] = [];

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'List Of Approved Stories',
    noDownload: false,
    headers: ["ssId", "ssTitle", "ssDescription", "Id"]
  };

  getStoriesByStatus(isApproved: boolean) {
    return this.api.getStoriesByStatus(isApproved).subscribe(res => {
      this.stories = res;
    });
  }

  ngOnInit(): void {
    this.getStoriesByStatus(true);
  }

  reslut!: any[];

  downloadCSV() {
    this.reslut = this.stories.map(x => ({
      "ssId": x.ssId,
      "ssTitle": x.ssTitle,
      "ssDescription": x.ssDescription,
      "Id": x.id
    })
    );
    new AngularCsv(this.reslut, "Stories", this.csvOptions);
  }

}
