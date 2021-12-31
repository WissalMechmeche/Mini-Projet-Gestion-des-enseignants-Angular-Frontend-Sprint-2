import { Enseignant } from './../model/enseignant.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { EnseignantService } from '../services/enseignant.service';
import { Departement } from '../model/departement.model';

@Component({
  selector: 'app-update-enseignant',
  templateUrl: './update-enseignant.component.html',
  styles: [
  ]
})
export class UpdateEnseignantComponent implements OnInit {
  currentEnseignant = new Enseignant();
  dep = new Departement();
  departements : Departement[];
  updatedDepartement = new Departement();

  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private enseignantService: EnseignantService)  { }

  ngOnInit(): void {
    this.enseignantService.consulterEnseignant(this.activatedRoute.snapshot.params.id)
    .subscribe( ensg => {
      this.currentEnseignant = ensg;
      this.dep = this.currentEnseignant.departement;
      console.log("currentEnseignant");
      console.log(this.currentEnseignant);
      console.log("dep ");
      console.log(this.dep);
    });
    this.enseignantService.listeDepartements().subscribe(dep => {
      this.departements = dep;
    });
  }
  updateEnseignant()
{
  this.updatedDepartement = this.departements.find(dept => dept.idDep == this.dep.idDep);
  this.currentEnseignant.departement = this.updatedDepartement;
  this.enseignantService.updateEnseignant(this.currentEnseignant).subscribe(ensg => {
  this.router.navigate(['enseignants']);
  },(error) => { alert("Problème lors de la modification !"); }
  );
}
}
