import { OnDestroy, OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-base',
  template: ``
})
// this class is used as base component for all components
export abstract class BaseComponent implements OnInit, OnDestroy {

  // alive is used to kill component level subscriptions
  alive = true;

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
