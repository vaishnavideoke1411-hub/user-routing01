import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../model/user';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-user-dashboared',
  templateUrl: './user-dashboared.component.html',
  styleUrls: ['./user-dashboared.component.scss']
})
export class UserDashboaredComponent implements OnInit {

  usersArr: Array<Iuser> = [];
  constructor(private _usersService: UserServiceService) {}

  ngOnInit(): void {
    this._usersService.fetchUser()
      .subscribe({
        next : (res) => {
          this.usersArr = res
        },
        error : err => {
          console.log(err);
          
        }
      })
  }

}
