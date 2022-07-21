import { Component } from '@angular/core';
import * as secret from 'secrets';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { TimelistService } from './services/timelist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'scheduler';
  time = new Date()

  constructor(private timeService: TimelistService, private http: HttpClient) {
  }

  ngOnInit() {


  }
}
