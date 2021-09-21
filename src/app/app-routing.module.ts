import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path: 'mission',
    canActivate:[AuthGuard],
    loadChildren: () => import('./mission/mission.module').then(m => m.MissionModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'parallax',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/item-details-parallax/item-details-parallax.module').then( m => m.ItemDetailsParallaxPageModule)
  },
  {
    path: 'expandable',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/item-details-expandable/item-details-expandable.module').then( m => m.ItemDetailsExpandablePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
