import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sdk-test',
    pathMatch: 'full'
  },
  {
    path: 'sdk-test',
    loadChildren: () =>
      import('./sdk-test/sdk-test.module').then(m => m.SdkTestModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
