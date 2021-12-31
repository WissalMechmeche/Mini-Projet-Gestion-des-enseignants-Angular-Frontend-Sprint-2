import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enseignant } from '../model/enseignant.model';
import { EnseignantService } from '../services/enseignant.service';
import { AuthService } from '../services/auth.service';
import { Departement } from '../model/departement.model';
@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {
  enseignants : Enseignant[]; //un tableau de chaînes de caractères
  departements : Departement[];

  constructor(private enseignantService: EnseignantService ,
    private router : Router , public authService: AuthService) {
    }
  ngOnInit(): void {
    this.enseignantService.listeEnseignants().subscribe(ensgs => {
      console.log(ensgs);
      this.enseignants = ensgs;
      });
      this.enseignantService.listeDepartements().subscribe(deps => {
        console.log(deps);
        this.departements = deps;
      });
  }
  supprimerEnseignant(e: Enseignant)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.enseignantService.supprimerEnseignant(e.idEnseignant).subscribe(() => {
  console.log("enseignant supprimé");
  this.SuprimerEnseignantDuTableau(e);

  });
}
 SuprimerEnseignantDuTableau(ensg : Enseignant) {
  this.enseignants.forEach((cur, index) => {
  if(ensg.idEnseignant=== cur.idEnseignant) {
  this.enseignants.splice(index, 1);
  }
  });
  }
}
