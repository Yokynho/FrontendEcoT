import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListarlotesComponent } from "./listarlotes/listarlotes.component";

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [ListarlotesComponent,RouterOutlet],
  templateUrl: './lotes.component.html',
  styleUrl: './lotes.component.css'
})
export class LotesComponent {
  constructor(public route:ActivatedRoute){}

}
