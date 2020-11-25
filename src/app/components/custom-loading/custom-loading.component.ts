import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DefaultBusService} from '../../helpers/event-bus/default-bus.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-custom-loading',
  templateUrl: './custom-loading.component.html',
  styleUrls: ['./custom-loading.component.less']
})
export class CustomLoadingComponent implements OnInit, OnDestroy {

  isSpinning = false;

  defaultBusServiceSubscribe: Subscription;

  constructor(private defaultBusService: DefaultBusService) {
    // 订阅是否显示加载对话框事件
    this.defaultBusServiceSubscribe = this.defaultBusService.loadingSpin$.subscribe(isLoadingSpin => {
      this.isSpinning = isLoadingSpin;
    });
  }

  ngOnInit(): void {
    console.log('执行 CustomLoadingComponent init')
  }

  ngOnDestroy(): void {
    console.log('执行 CustomLoadingComponent ngOnDestroy')
    if (this.defaultBusServiceSubscribe) {
      this.defaultBusServiceSubscribe.unsubscribe();
    }
  }

}
