import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base-component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'react-app' },
})
export class ContactComponent extends BaseComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.window._stlmppDestroyReactApp?.();
    this.window._stlmppDestroyReactApp = undefined;
  }

  override ngOnDestroy(): void {
    this.window._stlmppDestroyReactApp?.();
    this.window._stlmppDestroyReactApp = undefined;
    super.ngOnDestroy();
  }
}
