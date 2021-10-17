import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { trackByFactory } from '@stlmpp/utils';
import { Subject, takeUntil } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

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
  animations: [
    trigger('progress', [
      transition(':enter', [style({ height: 0, opacity: 0 }), animate(200, style({ height: '*', opacity: '*' }))]),
      transition(':leave', [style({ height: '*', opacity: '*' }), animate(200, style({ height: 0, opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  private readonly _destroy$ = new Subject<void>();

  readonly routes: Route[] = [
    { routerLink: '/', name: 'Home', exact: true },
    { routerLink: '/projects', name: 'Projects' },
    { routerLink: '/contact', name: 'Contact' },
  ];

  readonly trackByRoute = trackByFactory<Route>('name');

  loading = false;

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this._destroy$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.changeDetectorRef.markForCheck();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
        // TODO maybe add a modal here? I don't know
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
