import {VBaseTreeResp} from './v-base-tree-resp';

export interface VBookMenuResp extends VBaseTreeResp {
  id: string;
  children: VBookMenuResp[];
  nameZh: string;
  extra: any;
  nameEn: string;
  parentId: string;
  parent?: VBookMenuResp;
}
