import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OpenVisualData';

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if ((event instanceof NavigationEnd)) {
                ga('set', 'page', '/servicios/visualdata' + event.urlAfterRedirects);
                ga('send', 'pageview');
            } else {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}
