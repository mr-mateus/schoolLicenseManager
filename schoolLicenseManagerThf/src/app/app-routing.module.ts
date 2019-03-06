import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  { path: '', loadChildren: './shell/shell.module#ShellModule' },
  { path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
