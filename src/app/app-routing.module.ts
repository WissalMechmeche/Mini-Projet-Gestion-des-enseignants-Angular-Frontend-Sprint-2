import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { AddEnseignantComponent } from './add-enseignant/add-enseignant.component';
import { UpdateEnseignantComponent } from './update-enseignant/update-enseignant.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EnseignantGuard } from './enseignant.guard';
import { RechercheParDepartementComponent } from './recherche-par-departement/recherche-par-departement.component';
const routes: Routes = [
  {path: "enseignants", component : EnseignantsComponent},
  {path : "add-enseignant", component : AddEnseignantComponent, canActivate:[EnseignantGuard]},
  {path: "", redirectTo: "enseignants", pathMatch: "full" },
  {path: 'login', component: LoginComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "rechercheParDep", component : RechercheParDepartementComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "updateEnseignant/:id", component: UpdateEnseignantComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
