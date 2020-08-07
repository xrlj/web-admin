import {Component} from '@angular/core';
import {EventBusService} from './helpers/event-bus/event-bus.service';
import {UIHelper} from './helpers/ui-helper';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [EventBusService]
})
export class AppComponent {
  appName = '总后台';

  constructor(private eventBusService: EventBusService, private uiHelper: UIHelper) {
    const themeStyle = environment.themeStyle;
    uiHelper.changeTheme(themeStyle);
  }
}
