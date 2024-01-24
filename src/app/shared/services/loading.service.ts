import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  spinnerSource = new Subject<boolean>();

    spinnerObserver = this.spinnerSource.asObservable();
    
    toggleSpinner(show: boolean): void {
        this.spinnerSource.next(show);
    }
}
