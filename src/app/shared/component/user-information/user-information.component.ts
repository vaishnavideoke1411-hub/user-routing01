import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { userInfo } from 'os';
import { Iuser } from '../../model/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {

  userId !: number
  userInfo !: Iuser

  constructor(private _routes: ActivatedRoute ,
              private _userService : UserServiceService,
              private router: Router ,
              private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.userId = Number(this._routes.snapshot.params['id']);

    if (this.userId) {
      this._userService.fetchUserById(this.userId).subscribe({
        next: (user) => {
          if (user) {
            this.userInfo = user;
          } else {
            this.router.navigate(['/user']);
          }
        },

        error: (error) => console.error(error)
      });
  }
}

  removeUser(){
    
    let config = new MatDialogConfig()
    config.data = `Are you sure, You Want to Remove the user with Id ${this.userId}`
    config.width = '450px'

    config.disableClose = true

    let matRef = this._matDialog.open(GetConfirmComponent , config)

    matRef
      .afterClosed()
      .pipe(
        tap(res => console.log('Before Filter' , res)),
        filter(res => res),
        tap(res => console.log('After Filter' , res)),

          switchMap(() => {
            return this._userService.deleteUser(this.userId)
          })
      )
      .subscribe( {
        next : res => {
          console.log(res);
            this.router.navigate(['/user'])
          
        },
        error : err => {
          console.log(err);
        }
        
      })
  }


  // removeUser(){
  //   let config = new MatDialogConfig()
  //   config.data = `Are you sure, You Want to Remove the user with Id ${this.userId}`
  //   config.width = '450px'

  //   config.disableClose = true

  //   let matRef = this._matDialog.open(GetConfirmComponent , config)

  //   matRef.afterClosed()
  //     .subscribe((res : boolean) => {
  //       if (res) {
  //         this._userService.deleteUser(this.userId)
  //           .subscribe({
  //             next : data => {
  //               this.router.navigate(['/user'])
  //             },
  //             error : err => {
  //               console.log(err);
  //             }
  //           })
  //       }
  //     })
  // }

}
