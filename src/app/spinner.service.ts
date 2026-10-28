import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerSub$ = new BehaviorSubject<boolean>(false);
  spinnerObs$: Observable<boolean> = this.spinnerSub$.asObservable();

  private activeRequests = 0;

  show(): void {
    this.activeRequests++;
    this.spinnerSub$.next(true);
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    this.spinnerSub$.next(this.activeRequests > 0);
  }
}
