import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from '../../layouts/bootstrap/bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KangarooCheorographerRoutingModule } from './kangaroo-cheorographer-routing.module';
import { RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { HistoryComponent } from './history/history.component';


const KangarooCheorographerComponents: any[] = [
  NewComponent,
  HistoryComponent
];

@NgModule({
  imports: [
    CommonModule,
    KangarooCheorographerRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BootstrapModule,
  ],
  declarations: KangarooCheorographerComponents,
  providers: KangarooCheorographerComponents,
  exports: KangarooCheorographerComponents
})
export class KangarooCheorographerModule { }
