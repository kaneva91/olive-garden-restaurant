import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../shared/interfaces/user-interface';
import { tap, shareReplay } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  get userInfo() {
    return this.user;
  }

  get isLogged() {
    return !!this.user
  }
  set hasLoggedIn(value) {
    this.user = value;
  }

  set updateUser(updatedUser){
    this.user = updatedUser
  }


  authCompleted$ = this.http.get('api/auth').pipe(shareReplay(1));


  constructor(private http: HttpClient) {
    this.authCompleted$.subscribe((user: any) => {
      this.user = user;
    }, () => {
      this.user = null;
    });
  }

  regiter(dataInput) {
    const { firstName, lastName, email, passwords } = dataInput;
    const { password } = passwords;
    const data = { firstName, lastName, email, password };
    return this.http.post<IUser>('user/register', data)

  }

  login(data) {
    return this.http.post('user/login', data).pipe(tap((resp: any) => {
      this.user = resp;
      console.log(resp)
    }));
  }

  loguot() {
    return this.http.post('user/logout', {}).pipe(tap(() => {
      this.user = null;
    }));
  }

  delteProfile(id: String) {
    return this.http.delete(`user/${id}`).pipe(tap(() => {
    }))
  };

  editProfile(data) {
    console.log(this.user.id)
    return this.http.put(`user/${this.user.id}`, data)

  }

  addToCart(product) {
    return this.http.put(`user/add/${this.user.id}`, product)
  }

  getCartItems() {
    return this.http.get<IProduct[]>(`user/get/${this.user.id}`)
  }

  checkOut() {
    return this.http.put(`user/deleteCart/${this.user.id}`, {}).pipe(tap((updatedUser: IUser) => {
      
    }))
  }
}