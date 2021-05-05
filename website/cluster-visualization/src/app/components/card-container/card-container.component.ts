import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NodeEntity } from '../../interfaces/NodeEntity';
import { HttpRequestService } from '../../services/http-request.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  nodes: NodeEntity[] = [];

  @Output() nodeClick = new EventEmitter<string>();

  constructor(private httpService: HttpRequestService) { }

  ngOnInit(): void {

    // Get nodes from API
    this.httpService.getNodes().subscribe(data => {
      console.log(data);
      
      let asArray = Object.entries(data).map(( [k, v] ) => ({ [k]: v }));
      let nodes: NodeEntity[] = [];

      asArray.forEach(entry => {
        let values = Object.values(entry)[0];
        values.name = Object.keys(entry)[0];
        nodes.push(values);
      })
      
      this.nodes = nodes;
    });
    // this.nodes = [
    //   {
    //     name: "Test1",
    //     state: "Primary",
    //     isOnline: true
    //   }
    // ];
  }

  onClick(name: string) {
    this.nodeClick.emit(name);
  }

}
