import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NodeEntity } from '../../interfaces/NodeEntity';
import { HttpRequestService } from '../../services/http-request.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  nodesS1: NodeEntity[] = [];
  nodesS2: NodeEntity[] = [];
  activeNodeName: string = "";

  @Output() nodeClick = new EventEmitter<string>();

  constructor(private httpService: HttpRequestService) { }

  ngOnInit(): void {

    // Get nodes from API
    setInterval(this.fetchData, 3000);
  }

  onClick(name: string) {
    this.activeNodeName = name;
    this.nodeClick.emit(name);
  }

  fetchData() {
      this.httpService.getNodes().subscribe(data => {
      console.log(data);

      this.nodesS1 = data.splice(0, 3);
      this.nodesS2 = data;
  }
}
