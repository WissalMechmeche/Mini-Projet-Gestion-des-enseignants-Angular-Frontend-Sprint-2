import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  public loggedUser:string;
  token:string;
  public isloggedIn: Boolean = false;
  public roles:string[];
  apiURL: string = 'http://localhost:8085/users';
  constructor(private router: Router ,
    private http : HttpClient) { }
    login(user : User)
{
return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}
saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true;
  this.decodeJWT();
  }
decodeJWT()
{ if (this.token == undefined)
    return;
   const decodedToken = this.helper.decodeToken(this.token);
   this.roles = decodedToken.roles;
   console.log("roles"+this.roles);
   this.loggedUser = decodedToken.sub;
  }
loadToken() {
this.token = localStorage.getItem('jwt');
this.decodeJWT();
}
getToken():string {
return this.token;
}
getUserFromDB(username:string):Observable<User>
{
  const url = `${this.apiURL}/${username}`;
  return this.http.get<User>(url);
}
logout() {
  this.loggedUser = undefined;
  this.roles = undefined;
  this.token= undefined;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/login']);
}
isTokenExpired(): Boolean
{
    return this.helper.isTokenExpired(this.token);
}
    /*signIn(user :User){
      this.loggedUser = user.username;
      this.isloggedIn = true;
      this.roles = user.roles;
      localStorage.setItem('loggedUser',this.loggedUser);
      localStorage.setItem('isloggedIn',String(this.isloggedIn));
    }*/
    isAdmin():Boolean{
      if (!this.roles)
      return false;
     return this.roles.indexOf('ADMIN') >=0;
    }
    setLoggedUserFromLocalStorage(login : string) {
      this.loggedUser = login;
      this.isloggedIn = true;
      //this.getUserRoles(login);
    }
    /*getUserRoles(username :string){
      this.getUserFromDB(username).subscribe((user: User)=>{
      this.roles = user.roles;
      });
    }*/
}
