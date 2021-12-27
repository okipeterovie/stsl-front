import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { NewComponent } from './new/new.component';


export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'new',
  },
  {
    path: 'new',
    component: NewComponent,
  },
  {
    path: 'view-history',
    component: HistoryComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})


export class KangarooCheorographerRoutingModule { }
