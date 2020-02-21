import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  errorMessage = "";
  error = "";
  jobs = [];

  constructor(private jobService:JobService) { }

  ngOnInit() {

  this.jobService.searchjobSubject.subscribe(
            data => {
                this.handleServerResponse(data);
            },
            error => {
                this.handleError(error);
            }
        );

  }

  handleServerResponse(data) {
    if(data.success) {
      this.jobs = data.jobs;
    } else {
      this.errorMessage = "errorMessage";
    }
  }

  handleError(error) {
    console.log('handleError ', error.statusText);
    this.error = error;
  }
}
