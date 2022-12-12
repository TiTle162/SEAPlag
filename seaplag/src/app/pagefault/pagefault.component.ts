import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagefault',
  templateUrl: './pagefault.component.html',
  styleUrls: ['./pagefault.component.css']
})
export class PagefaultComponent {
  constructor(private router: Router) { }
}
