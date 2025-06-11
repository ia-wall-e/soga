import { Component, Input, OnInit } from '@angular/core';
import { INavigationData } from '../../../utils/category-interface';

@Component({
  selector: 'app-attribute-node',
  templateUrl: './attribute-node.component.html',
  styleUrls: ['./attribute-node.component.scss'],
})
export class AttributeNodeComponent  implements OnInit {
@Input() navigationData?: INavigationData;
  constructor() { }

  ngOnInit() {
    console.log(this.navigationData)
  }

}
