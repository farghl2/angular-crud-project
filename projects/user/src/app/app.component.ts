import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate:TranslateService){
    translate.addLangs(['en', 'ar']);
    // translate.setDefaultLang('en');
    translate.use('en');
  }

  title = 'angulartasks';
}
