import { Component } from '@angular/core';
@Component({
    selector: 'd-custom',
    templateUrl: './custom.component.html',
    standalone: false
})
export class CustomComponent {
  tabActiveId: string | number = 'tab1';
  tabItems = [
    {
      id: 'tab1',
      title: '代码',
      content: `Tab1 Content`,
      icon: 'icon-code',
    },
    {
      id: 'tab2',
      title: '合并请求',
      content: `Tab2 Content`,
      disabled: true,
      icon: 'icon-merge-request',
    },
    {
      id: 'tab3',
      title: 'Issues',
      content: `Tab3 Content`,
      icon: 'icon-help',
    },
    {
      id: 'tab4',
      title: 'Wiki',
      content: `Tab4 Content`,
      icon: 'icon-property',
    },
  ];
}
