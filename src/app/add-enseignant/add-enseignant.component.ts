import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from '../model/departement.model';
import { Enseignant } from '../model/enseignant.model';
import { EnseignantService } from '../services/enseignant.service';
@Component({
  selector: 'app-add-enseignant',
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.css']
})
export class AddEnseignantComponent implements OnInit {
  newEnseignant = new Enseignant();
  departements : Departement[];
  newIdDep : number;
  newDepartement : Departement;
  constructor(private enseignantService: EnseignantService ,
    private router :Router) { }
  ngOnInit(): void {
    this.enseignantService.listeDepartements().subscribe(dep => {
      console.log(dep);
      this.departements= dep;
    });}
  addEnseignant(){
    this.newDepartement = this.departements.find( dep => dep.idDep == this.newIdDep);
    this.newEnseignant.departement = this.newDepartement;
    this.enseignantService.ajouterEnseignant(this.newEnseignant)
    .subscribe(ensg => {
    console.log(ensg);
    this.router.navigate(['enseignants']);
    });
    }
}
