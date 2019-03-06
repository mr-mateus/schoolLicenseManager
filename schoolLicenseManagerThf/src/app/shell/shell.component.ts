import { Component } from '@angular/core';
import { ThfMenuItem } from '@totvs/thf-ui';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent {

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/' },
    { label: 'Alunos', link: '/students' },
    { label: 'Turmas', link: '/schoolClasses' },
    { label: 'Professores', link: '/teachers' },
    { label: 'Disciplinas', link: '/disciplines' },
  ];

}
