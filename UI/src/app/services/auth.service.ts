import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginvm } from '../models/loginvm';
import { Ssuser } from '../models/ssuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:5041/api/accounts";
  constructor(private api: HttpClient) { }

  //register(user: Ssuser) {
  //  return this.api.post<Ssuser>(this.baseUrl + "/register", user);
  //}

  register(formData: FormData) {
    return this.api.post<Ssuser>(this.baseUrl + "/register", formData);
  }

  login(loginUser: Loginvm) {
    return this.api.post<Loginvm>(this.baseUrl + "/login", loginUser, { withCredentials: true });
  }

  logout() {
    return this.api.post<any>(this.baseUrl + "/logout", null, { withCredentials: true });
  }

  getProfilePic() {
    return this.api.get(this.baseUrl + "/getProfilePic/", { responseType: "blob" });
  }

}
