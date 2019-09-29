import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @Input() docsInFolder: Array<any>;
  @Output() openDocFrom = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  openDocFromMain(currDoc: { id: any; }) {
    this.openDocFrom.emit({
      currentDocId: currDoc.id
    });
  }
}
