import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistemas_Interactivo';


  constructor(private router: Router) { }

  goToPag(id:number){
    this.router.navigate(['EMat',id])
  }
}
