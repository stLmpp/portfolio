import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base/base-component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'svelte-app' },
})
export class ProjectsComponent extends BaseComponent implements OnDestroy {
  override ngOnDestroy(): void {
    this.window._stlmppDestroySvelteApp?.();
    this.window._stlmppDestroySvelteApp = undefined;
    super.ngOnDestroy();
  }
}
