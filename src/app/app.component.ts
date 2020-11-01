import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tick: number;
  private subscription: Subscription;
  ngOnInit() {
    let timer = TimerObservable.create(1000,1000);
    this.subscription = timer.subscribe(t => {
      this.tick = t;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe
  }
}
