import { ICategoryModel } from "src/app/core/interface/category-model";

// export interface ICategoryData{
//     categoryID:string,
//     level:number,
//     parentID?: string;
//     parentLevel?: number;
//     rootID:string
// } 
export interface INavigationData {
    componentID: string,
    categoryData?: ICategoryModel ,
    categoryID?: string 

}