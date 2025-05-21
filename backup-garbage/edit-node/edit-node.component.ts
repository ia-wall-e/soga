import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditNodeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
