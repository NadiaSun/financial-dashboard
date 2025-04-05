import { Component } from '@angular/core';
import { InformationCardComponent } from '../information-card/information-card.component';
import { TopCardComponent } from '../top-card/top-card.component';

@Component({
  selector: 'app-info-container',
  imports: [InformationCardComponent, TopCardComponent],
  templateUrl: './info-container.component.html',
  styleUrl: './info-container.component.scss',
})
export class InfoContainerComponent {}
