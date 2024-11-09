import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListarsignupComponent } from './listarsignup/listarsignup.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, ListarsignupComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(public route:ActivatedRoute){}
}
