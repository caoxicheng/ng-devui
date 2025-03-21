import {
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { DevConfigService, expandCollapseForDomDestroy, WithConfig } from 'ng-devui/utils';
import { Observable } from 'rxjs';
import { PanelBodyComponent } from './panel-body.component';
import { PanelFooterComponent } from './panel-footer.component';
import { PanelHeaderComponent } from './panel-header.component';
import { PanelType } from './panel.types';

@Component({
    selector: 'd-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    animations: [trigger('noAnimation', [transition(':enter', [])]), expandCollapseForDomDestroy],
    standalone: false
})
export class PanelComponent {
  @Input() type: PanelType = 'default';
  @Input() cssClass: string;
  @Input() isCollapsed: boolean;
  @Input() hasLeftPadding = true;
  @Input() @WithConfig() showAnimation = true;
  @Input() beforeToggle: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ContentChild(PanelHeaderComponent) panelHeader;
  @ContentChild(PanelFooterComponent) panelFooter;
  @ContentChild(PanelBodyComponent) panelBody;
  constructor(private devConfigService: DevConfigService) {  }
  toggleBody() {
    this.canToggle().then((val) => {
      if (!val) {
        return;
      }
      if (this.isCollapsed !== undefined) {
        this.isCollapsed = !this.isCollapsed;
        this.toggle.emit(this.isCollapsed);
      }
    });
  }

  canToggle() {
    let changeResult = Promise.resolve(true);

    if (this.beforeToggle) {
      const result: any = this.beforeToggle(this.isCollapsed);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  }
}
