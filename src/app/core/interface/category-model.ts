export interface ICategoryModel {
  _id: string,
  label: string,
  type: string,
  nodeType: NodeType,
  level: number,
  description?: string | null,
  status: boolean,
  display: boolean,
  highlight: boolean,
  childNodes: number | null,
  icon: string | null,
  products: number | null,
  metadata: {
    createDate: any,
    lastUpdate: any,
  }
  rootID: string | null,
  rootLabel: string | null,
  parentID: string | null,
  parentLabel: string | null,
  parentLevel: number | null,
}


export type NodeType = 'root' | 'parent' | 'child' | 'leaf';
