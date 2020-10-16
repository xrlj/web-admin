export interface VAreaDicResp {
  id: string;
  code: string;
  lat: string;
  lng: string;
  mergerName: string;
  name: string;
  pinyin: string;
  shortName: string;
  telCode: string;
  zipCode: string;
  areaType: string;
  lastUpdated: Date;
  parentId?: string;
  parent?: VAreaDicResp;
  children?: VAreaDicResp[];
  level?: number;
  expand?: boolean;
}
