import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {

  @Input() dataArr: any[];
  constructor() { }

  ngOnInit(): void { }

  getData(data: any): string {
    let temp = {...data};

    delete temp._id;
    delete temp.shardKey;
    return JSON.stringify(temp);
  }
}
