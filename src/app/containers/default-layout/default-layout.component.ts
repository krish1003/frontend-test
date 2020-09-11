import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  user:User;
  constructor(private authService: AuthService) {
    //het login user details and consider text before @ in  email is username
    this.user = this.authService.currentUserValue;
    this.user.username = this.user.email.substring(0, this.user.email.indexOf("@"));
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.authService.logout();
  }
}
