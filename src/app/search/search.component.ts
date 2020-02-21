import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobs = [];
  constructor(private jobService:JobService) {
  }

  ngOnInit() {
  }

  searchJobs(searData)
  {
    this.jobService.searchJobs(searData)
          .subscribe(
              data => this.jobs = data
                ,
              error => console.error(error)
              );
  }

}
