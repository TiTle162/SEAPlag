import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  current_year: any = new Date().getFullYear();

  constructor(private router: Router){}
  
}
