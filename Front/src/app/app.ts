import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { NotificationComponent } from './notifications/notifications';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, NotificationComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit{
  protected readonly title = signal('Front');


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Scroll en haut à chaque navigation
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
