import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorComponent } from './pages/bor/bor.component';

const routes: Routes = [
  { path: 'bor', component: BorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
