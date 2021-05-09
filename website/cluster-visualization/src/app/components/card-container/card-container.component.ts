import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
  countS1: string = "-";
  countS2: string = "-";
  activeNodeName: string = "";

  @Output() nodeClick = new EventEmitter<string>();

  constructor(private httpService: HttpRequestService) { }

  ngOnInit(): void {

    // Get nodes from API
    this.fetchData();
  }

  onClick(name: string) {
    this.activeNodeName = name;
    this.nodeClick.emit(name);
  }

  fetchData(): void {
    timer(0, 1000).pipe(mergeMap(() => this.httpService.getNodes())
    ).subscribe(data => {
      //this.countS1 = data[0].count.toString();
      //this.countS2 = data[3].count.toString();

      this.nodesS1 = data.splice(0, 3);
      this.nodesS2 = data;

      let onlineNodeS1 = this.nodesS1.find(node => node.isOnline);
      let onlineNodeS2 = this.nodesS2.find(node => node.isOnline);
      this.countS1 = onlineNodeS1 ? onlineNodeS1.count.toString() : "-";
      this.countS2 = onlineNodeS2 ? onlineNodeS2.count.toString() : "-";
    });
  }
}
