import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iuser } from '../model/user';
import { usersArr } from '../const/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  usersArr: Iuser[] = [...usersArr];

  constructor() {}

  fetchUser(): Observable<Iuser[]> {
    return of(this.usersArr);
  }

  fetchUserById(id: number): Observable<Iuser | undefined> {
    return of(this.usersArr.find(user => user.id === id));
  }

  postUser(user: Iuser): Observable<Iuser> {
    this.usersArr.push(user);
    return of(user);
  }

  updateUser(user: Iuser): Observable<Iuser | undefined> {
    const index = this.usersArr.findIndex(
      item => item.id === user.id
    );

    if (index === -1) {
      return of(undefined);
    }

    this.usersArr[index] = { ...user };

    return of(this.usersArr[index]);
  }

  deleteUser(id: number): Observable<boolean> {
    let index = this.usersArr.findIndex(
      user => user.id === id);

    if (index === -1) {
      return of(false);
    }

    this.usersArr.splice(index, 1);

    this.usersArr.forEach((user, i) => {
      user.id = i + 1;
    });

    return of(true);
  }
}