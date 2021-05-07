import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
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
  intervalId: number = null;

  @Output() nodeClick = new EventEmitter<string>();

  constructor(private httpService: HttpRequestService) { }

  ngOnInit(): void {

    // Get nodes from API
    this.intervalId = setInterval(this.fetchData, 3000);
  }

  onClick(name: string) {
    this.activeNodeName = name;
    this.nodeClick.emit(name);
  }

  fetchData(): void {
    interval(3000).pipe(exhaustMap(this.httpService.getNodes)
    ).subscribe(data => {

      this.nodesS1 = data.splice(0, 3);
      this.nodesS2 = data;
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
