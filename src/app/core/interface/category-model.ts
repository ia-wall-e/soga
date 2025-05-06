export interface ICategoryModel{
    _id:string,
    label: string,
    type: string,
    level: number,
    description?: string | null,
    status:boolean,
    display: boolean,
    highlight:boolean,
    nodes: number | null,
    icon: string | null,
    products: number | null,
    metadata: {
      createDate: any,
      lastUpdate:any,
    }
    rootID:string | null,
    rootLabel:string | null,
    parentID:string | null,
    parentLabel :string | null,
    parentLevel:number | null,
}
