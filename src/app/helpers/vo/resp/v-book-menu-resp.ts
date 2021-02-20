import {VBaseTreeResp} from './v-base-tree-resp';

export interface VBookMenuResp extends VBaseTreeResp {
  id: string;
  children: VBookMenuResp[];
  nameZh: string;
  extra: any;
  nameEn: string;
  showStatus: boolean;
  bookMenuSort: number;
  parentId: string;
  parent?: VBookMenuResp;
}
