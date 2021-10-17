import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackByFactory } from '@stlmpp/utils';

interface Route {
  routerLink: string;
  name: string;
  exact?: boolean;
}

@Component({
  selector: 'st-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly routes: Route[] = [
    { routerLink: '/', name: 'Home', exact: true },
    { routerLink: '/projects', name: 'Projects' },
    { routerLink: '/contact', name: 'Contact' },
  ];

  readonly trackByRoute = trackByFactory<Route>('name');
}
