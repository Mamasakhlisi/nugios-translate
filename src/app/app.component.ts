import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'json-translate';
  constructor(private renderer: Renderer2) {}
  darkMode: boolean = false;

  changeTheme() {
    this.darkMode = !this.darkMode;
    this.darkMode
      ? this.renderer.addClass(document.body, 'dark-mode')
      : this.renderer.removeClass(document.body, 'dark-mode');
  }
}
