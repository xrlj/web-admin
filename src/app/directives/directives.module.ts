import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextColorThemeDirective} from './text-color-theme.directive';
import {HighlightDirective} from './highlight.directive';

@NgModule({
  declarations: [TextColorThemeDirective, HighlightDirective],
  exports: [
    TextColorThemeDirective,
    HighlightDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
