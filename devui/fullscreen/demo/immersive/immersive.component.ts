import { Component } from '@angular/core';

@Component({
    selector: 'd-fullscreen-demo-immersive',
    templateUrl: './immersive.component.html',
    standalone: false
})
export class FullscreenDemoImmersiveComponent {
  btnContent = 'FullScreen';

  launchFullscreen({ isFullscreen }) {
    if (isFullscreen) {
      this.btnContent = 'Exit';
    } else {
      this.btnContent = 'FullScreen';
    }
  }
}
