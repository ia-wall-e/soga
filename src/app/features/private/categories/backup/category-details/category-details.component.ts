import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { ICategoryData, INavigationData } from '../../utils/category-interface';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss', '../components-commons.scss'],
  imports: [WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryDetailsComponent implements OnInit, AfterViewInit {
  @Input() categoryData!: ICategoryData;
  @Output() navigationData? = new EventEmitter<INavigationData>();
  item: any;
  nodes?:any;
  constructor(private categorySvc: CategoriesProductsService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.handlerData()
  }
  handlerData() {
    console.log(this.categoryData)
    const rootID = this.categoryData?.parentID;
    this.categorySvc.getRoot(rootID)?.then((r)=>{
      this.item = r;
      console.log(this.item);
    })
    this.categorySvc.getNodes(rootID)?.then((r)=>{
      this.nodes= r;
      // console.log(this.nodes)
    })
  }
  onNavigation(navData:INavigationData) {
    this.navigationData?.emit(navData)
  }
}
