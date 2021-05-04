import { Component, OnInit } from '@angular/core';
import { NodeEntity } from '../../interfaces/NodeEntity';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  nodes: NodeEntity[] = [
    {
      name: "Test1",
      isPrimary: false,
      isOnline: true,
    },
    {
      name: "Test2",
      isPrimary: true,
      isOnline: true,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    // console.log(this.nodes);
  }

}
