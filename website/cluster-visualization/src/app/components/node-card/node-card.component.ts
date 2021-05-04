import { Component, Input, OnInit } from '@angular/core';
import { NodeEntity } from 'src/app/interfaces/NodeEntity';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss']
})
export class NodeCardComponent implements OnInit {

  @Input() node: NodeEntity;

  constructor() { }

  ngOnInit(): void {
    console.log(this.node);
  }

}
