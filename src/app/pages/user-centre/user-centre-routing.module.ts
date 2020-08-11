import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCentreComponent} from './user-centre.component';

const routes: Routes = [
  {path: '', component: UserCentreComponent, data: {title: '个人中心', isRemove: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCentreRoutingModule { }
