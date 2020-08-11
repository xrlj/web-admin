import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCentreComponent} from './user-centre.component';
import {UserCentreRoutingModule} from './user-centre-routing.module';

@NgModule({
  declarations: [UserCentreComponent],
  imports: [
    CommonModule,
    UserCentreRoutingModule
  ]
})
export class UserCentreModule { }
