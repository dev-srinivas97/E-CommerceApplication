import { Component, HostListener } from '@angular/core';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { TokenStorageService } from './Services/token-storage.service';
const jwtToken="service_id";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly jwtToken = 'auth-token';
  constructor( private router: Router,
    public tokenStorage: TokenStorageService) {
  }

  //@HostListener lets us to listen for events on the  component
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    // before load first it process...
    // debugger;
    //before page load token will be stored window session
    if (this.tokenStorage.getTokenFromCache()) {
      window.sessionStorage.setItem(
        jwtToken,
        this.tokenStorage.getTokenFromCache()
      );
    }
  }

  ngOnInit() {
    // debugger;
      //on page reload we are saving token in cache and removing it from window session storage
      //on page reload we are saving token in cache and removing it from window session storage
    this.tokenStorage.saveTokenInCache(this.tokenStorage.getTempToken());
 
    window.sessionStorage.removeItem(jwtToken);
  }
}
