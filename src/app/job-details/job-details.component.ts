import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobDetails = null;
  error = null;
  errorMessage = '';
  constructor(private jobsrvice: JobService, private route: ActivatedRoute) { }

  ngOnInit() {
    //var id = this.activateRoute.snapshot.params['id'];
const id = this.route.snapshot.params['id'];
this.jobsrvice.getJobByID(id)
    .subscribe(
        data => {
            this.handleServerResponse(data);
        },
        error => {
            this.handleError(error);
        }
    );

}

handleServerResponse(response) {
  if(response.success) {
      this.jobDetails = response.job;
  } else {
      this.errorMessage = response.message;
  }
}

handleError(error) {
  console.log('handleError ', error.statusText);
  this.error = error;
}

}
