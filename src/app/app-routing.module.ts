import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmbeddedSDKSampleComponent } from './components/embedded-sdk-sample/embedded-sdk-sample.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'sdksample'
  },
  {
    path: 'sdksample', component: EmbeddedSDKSampleComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
