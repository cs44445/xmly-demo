import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { TagModule } from 'src/app/components/tag/tag.module';

@NgModule({
  declarations: [
    AlbumComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    DirectivesModule,
    PipesModule,
    TagModule
  ]
})
export class AlbumModule { }
