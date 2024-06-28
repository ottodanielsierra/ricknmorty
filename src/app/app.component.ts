import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'ricknmorty';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {    
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
