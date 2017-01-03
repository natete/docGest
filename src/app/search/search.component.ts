import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  selectedCategory: string = '';
  categories = [
    {
      value: '3412341',
      viewValue: '1. Administración'
    },
    {
      value: '34123423341',
      viewValue: '2. Contratos'
    },
    {
      value: '34677341',
      viewValue: '3. Servicios'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
