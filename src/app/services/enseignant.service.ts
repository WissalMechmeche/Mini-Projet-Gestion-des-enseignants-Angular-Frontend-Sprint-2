import { Departement } from './../model/departement.model';
import { Injectable } from '@angular/core';
import { Enseignant } from '../model/enseignant.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  enseignants : Enseignant[]; //un tableau de Produit
  enseignant : Enseignant ;
  departements : Departement[];
  apiURL: string = 'http://localhost:8082/enseignants/api';
  apiURLDep: string = 'http://localhost:8082/enseignants/api/departements';

constructor(private http : HttpClient ,
  private authService : AuthService) {
}
listeEnseignants():Observable<Enseignant[]> {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Enseignant[]>(this.apiURL+"/all",{headers:httpHeaders}
);
}
ajouterEnseignant(ensg: Enseignant):Observable<Enseignant>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.post<Enseignant>(this.apiURL, ensg, {headers:httpHeaders});
}
supprimerEnseignant(id : number){
  const url = `${this.apiURL}/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.delete(url, {headers:httpHeaders});
  }
  consulterEnseignant(id:number):Observable<Enseignant>{
  const url = `${this.apiURL}/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Enseignant>(url,{headers:httpHeaders});
  }
  trierEnseignants(){
  this.enseignants = this.enseignants.sort((n1,n2) => {
  if (n1.idEnseignant > n2.idEnseignant) {
    return 1;
  }
  if (n1.idEnseignant < n2.idEnseignant) {
    return -1;
  }
  return 0;
  });
  }
  updateEnseignant(e:Enseignant) : Observable<Enseignant>
  {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put<Enseignant>(this.apiURL, e, {headers:httpHeaders});
  }
  listeDepartements():Observable<Departement[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Departement[]>(this.apiURLDep,{headers:httpHeaders}
  );
  }
  consulterDepartement(id:number):Observable<Departement>{
    const url = `${this.apiURLDep}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Departement>(url,{headers:httpHeaders});
    }
    
}


