import { Component, OnInit } from '@angular/core';
import { Departement } from '../model/departement.model';
import { Enseignant } from '../model/enseignant.model';
import { AuthService } from '../services/auth.service';
import { EnseignantService } from '../services/enseignant.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
  enseignants : Enseignant[];
  departements : Departement[];
  enseignantsRecherche : Enseignant[];
  nom : string;
  constructor(private enseignantService : EnseignantService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.enseignantService.listeEnseignants().subscribe(ensgs => {
      console.log(ensgs);
      this.enseignants = ensgs;
      this.enseignantsRecherche = ensgs;
      });
      this.enseignantService.listeDepartements().subscribe(deps => {
        console.log(deps);
        this.departements = deps;
      });
    this.enseignantsRecherche = this.enseignants;
  }


onChange() {
    this.enseignantsRecherche = [];
    this.enseignants.forEach((cur, index) => {
    if(cur.nomEnseignant.indexOf(this.nom)>=0) {
    console.log("cur "+cur);
    this.enseignantsRecherche.push(cur);
    }
  });
}
}
