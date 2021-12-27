import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './main/default/default.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'default' },
  { path: 'default', component: DefaultComponent },
  {
    path: 'kangaroo-cheorographer',
    loadChildren: () => import('./main/kangaroo-cheorographer/kangaroo-cheorographer.module').then(m => m.KangarooCheorographerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
