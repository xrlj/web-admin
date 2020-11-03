import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EbookListComponent} from './ebook-list/ebook-list.component';
import {EbookFolderComponent} from './ebook-folder/ebook-folder.component';
import {EbookAddComponent} from './ebook-add/ebook-add.component';


const routes: Routes = [
  {path: 'list', component: EbookListComponent, data: {title: '书籍列表', isRemove: true}},
  {path: 'edit/:id', component: EbookAddComponent, data: {title: '书籍维护', isRemove: true}},
  {path: 'folder', component: EbookFolderComponent, data: {title: '分类维护', isRemove: true}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EbookRoutingModule {
}
