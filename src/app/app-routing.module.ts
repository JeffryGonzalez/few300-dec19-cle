import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GiftGivingComponent } from './features/gift-giving/gift-giving.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'administration',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService]

  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
