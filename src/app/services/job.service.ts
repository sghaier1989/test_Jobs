import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject} from 'rxjs/rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService {
  jobs = [];
  initialJobs =[];
  jobSubject = new Subject();
  searchjobSubject = new Subject() ;
  searchResultSubject = new Subject();
  base_URL = 'http://localhost:4201/api'
  constructor(private http:Http) {}

  getJobs(){
    if (this.jobs.length > 0 && this.initialJobs.length > 0) {
            console.log('case if ', this.jobs);
            return Observable.of([...this.jobs, ...this.initialJobs]);
        } else if(this.jobs.length > 0 && this.initialJobs.length === 0) {
            console.log('case else if');
            return this.http.get(this.base_URL  + '/jobs')
                .map(res => res.json())
                .do(data => {
                    this.initialJobs = data;
                    this.jobs = [...this.jobs, ...this.initialJobs]
                });
        } else {
            console.log('case else');
            return this.http.get(this.base_URL + '/jobs')
                .map(res => res.json())
                .do(data => this.initialJobs = data);
        }

  }

  addJob(jobData)
  {
    console.log("ADD")
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.http.post(this.base_URL + '/jobs', jobData)
            .map(res => {
                console.log(res);
                this.jobSubject.next(jobData);
            });
  }

  getJobByID(id){
    return this.http.get(this.base_URL + '/jobs/' + id )
        .map(res => res.json());
}

searchJobs(criteria) {
    console.log(this.base_URL + '/search/' + criteria.term +'/' + criteria.place);
    return this.http.get(this.base_URL + '/search/' + criteria.term +'/' + criteria.place)
        .map(res => res.json())
        .do(res => this.searchjobSubject.next(res));
}


}
