import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdkTestComponent } from './sdk-test.component';
import { MasterpassSdkTestPageComponent } from './components/masterpass-sdk-test-page/masterpass-sdk-test-page.component';

const routes: Routes = [
  { path: '', component: MasterpassSdkTestPageComponent },
  { path: 'old', component: SdkTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdkTestRoutingModule { }
