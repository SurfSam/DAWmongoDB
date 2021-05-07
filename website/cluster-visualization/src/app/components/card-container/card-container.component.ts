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
    timer(0, 3000).pipe(mergeMap(() => this.httpService.getNodes())
    ).subscribe(data => {
      this.nodesS1 = data.splice(0, 3);
      this.nodesS2 = data;
    });
  }
}
