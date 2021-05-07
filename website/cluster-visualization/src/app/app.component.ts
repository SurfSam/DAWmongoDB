import { Component } from '@angular/core';
import { HttpRequestService } from './services/http-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tableArr: any[];

  constructor(private httpService: HttpRequestService) { }

  onNodeClick(name: string) {
    console.log(`Clicked ${name} app.components`);
    this.httpService.getNodeData(name).subscribe(data => {
      let values  = Object.values(data);

      values = values.sort((a,b) => a._id.localeCompare(b._id));
      this.tableArr = values;
    });
  }

}
