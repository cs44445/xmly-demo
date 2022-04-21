import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { TagModule } from 'src/app/components/tag/tag.module';
import { PaginationModule } from 'src/app/common/pagination/pagination.module';


@NgModule({
  declarations: [
    AlbumsComponent
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    DirectivesModule,
    PipesModule,
    TagModule,
    PaginationModule
  ]
})
export class AlbumsModule { }
