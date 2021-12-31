import { Enseignant } from './../model/enseignant.model';
import { EnseignantService } from './../services/enseignant.service';
import { Component, OnInit } from '@angular/core';
import { Departement } from '../model/departement.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-departement',
  templateUrl: './recherche-par-departement.component.html',
  styles: [
  ]
})
export class RechercheParDepartementComponent implements OnInit {
  enseignantsRecherche : Enseignant[];
  departements : Departement[];
  enseignants : Enseignant [];
  idDep : number;

  constructor(private enseignantService : EnseignantService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.enseignantService.listeDepartements().subscribe( deps =>{
      this.departements = deps;
      console.log(this.departements);
    });

    this.enseignantService.listeEnseignants().subscribe(ensgs => {
      this.enseignants = ensgs;
      this.enseignantsRecherche = ensgs;
      console.log(this.enseignants);
    });
    this.enseignantsRecherche = this.enseignants;
  }
  onChange(){
    this.enseignantsRecherche = [];
    this.enseignants.forEach((cur, index) => {
      if(this.idDep == cur.departement.idDep){
        console.log("cur = "+cur);
        this.enseignantsRecherche.push(cur);
      }
    });
  }

}
