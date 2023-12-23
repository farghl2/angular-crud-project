import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './dashboard/manage-users/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(translate: TranslateService, private userService: UsersService) {
    translate.addLangs(['en', 'ar']);
    // translate.setDefaultLang('en');
    translate.use('en');
  }

  title = 'angulartasks';

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(((res:any)=>{
      this.userService.user.next(res.users);
    }))
  }
}
