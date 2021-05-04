import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
