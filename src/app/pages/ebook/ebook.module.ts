import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EbookRoutingModule } from './ebook-routing.module';
import { EbookListComponent } from './ebook-list/ebook-list.component';
import { EbookFolderComponent } from './ebook-folder/ebook-folder.component';
import { EbookAddComponent } from './ebook-add/ebook-add.component';
import {NzButtonModule, NzCardModule, NzDividerModule, NzFormModule, NzIconModule, NzInputModule, NzInputNumberModule, NzModalModule, NzSelectModule, NzTableModule, NzTagModule, NzTreeSelectModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [EbookListComponent, EbookFolderComponent, EbookAddComponent],
  imports: [
    CommonModule,
    EbookRoutingModule,
    NzCardModule,
    NzSelectModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzModalModule,
    NzFormModule,
    NzTreeSelectModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class EbookModule { }
