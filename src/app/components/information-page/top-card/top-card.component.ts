import { Component, Input } from '@angular/core';
import { ITopUser } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-top-card',
  imports: [],
  templateUrl: './top-card.component.html',
  styleUrl: './top-card.component.scss',
})
export class TopCardComponent {
  @Input() topUsers!: ITopUser[];
  @Input() title: string = 'ТОП-10';
}
