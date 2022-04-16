import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EProfComponentComponent } from './eprof-component/eprof-component.component';
import { EMatComponentComponent } from './emat-component/emat-component.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegUsuComponent } from './reg-usu/reg-usu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavegadorComponent } from './navegador/navegador.component';
import { VisitarPaginaComponent } from './visitar-pagina/visitar-pagina.component';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';



const routes: Routes=[
  {path:'', component:HomeComponentComponent},
  {path:'Pag/:uni/:carr', component:VisitarPaginaComponent},
  {path:'Pag', component:VisitarPaginaComponent},
  {path:'EMat/:uni/:carr/:mat', component:EMatComponentComponent},
  {path:'EProf/:uni/:carr/:prof', component:EProfComponentComponent},
  {path:'RegUsu',component:RegUsuComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    EProfComponentComponent,
    EMatComponentComponent,
    HomeComponentComponent,
    RegUsuComponent,
    NavegadorComponent,
    VisitarPaginaComponent,
    BienvenidoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
