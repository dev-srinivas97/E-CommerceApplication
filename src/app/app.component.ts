import { Component, HostListener } from '@angular/core';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { TokenStorageService } from './Services/token-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly jwtToken = 'auth-token';
  constructor( private router: Router,
    public tokenStorage: TokenStorageService) {
  }

  //@HostListener lets us to listen for events on the  component
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    // before load first it process...
    //before page load token will be stored window session
    if (this.tokenStorage.getCacheToken()) {
      window.sessionStorage.setItem(
        this.jwtToken,
        this.tokenStorage.getCacheToken()
      );
    }
  }

  ngOnInit() {
      //on page reload we are saving token in cache and removing it from window session storage
      this.tokenStorage.saveTokenInCache(this.tokenStorage.getTempToken());
   
      window.sessionStorage.removeItem(this.jwtToken);
  }
}