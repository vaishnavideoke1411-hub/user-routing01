import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-routing01';
  isLoading !:boolean;
  isLoding$:Observable<boolean> = this._spinnerService.spinnerObs$

  constructor(private _spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this._spinnerService.spinnerObs$.subscribe((res: boolean) => {
      this.isLoading = res;
      console.log(res)
    });
  }
}