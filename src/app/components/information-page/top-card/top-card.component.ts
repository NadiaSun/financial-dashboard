import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { ITopUser } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-top-card',
  imports: [],
  standalone: true,
  templateUrl: './top-card.component.html',
  styleUrl: './top-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopCardComponent {
  topUsers = input<ITopUser[]>([]);
  title = input<string>('ТОП-10');
}
