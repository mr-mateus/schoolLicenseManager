import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShellComponent } from './shell.component';

export const shellRoutes: Routes = [
  {
    path: '', component: ShellComponent,
    children: [
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'students', loadChildren: './students/students.module#StudentsModule' },
      { path: 'teachers', loadChildren: './teachers/teachers.module#TeachersModule' },
      { path: 'schoolClasses', loadChildren: './school-classes/school-classes.module#SchoolClassesModule' },
      { path: 'disciplines', loadChildren: './disciplines/disciplines.module#DisciplinesModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(shellRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShellRoutingModule { }
