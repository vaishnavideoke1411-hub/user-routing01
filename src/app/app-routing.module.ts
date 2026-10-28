import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './shared/component/product/product.component';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { UserInformationComponent } from './shared/component/user-information/user-information.component';
import { UserDashboaredComponent } from './shared/component/user-dashboared/user-dashboared.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserDashboaredComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'user-form',
    component: UserFormComponent
  },
  {
    path: 'user/add',
    component: UserFormComponent
  },
  {
    path: 'user/:id',
    component: UserInformationComponent
  },
  
  {
    path: 'user/:id/edit',
    component: UserFormComponent
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}