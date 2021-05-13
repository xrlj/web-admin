import {UserTypeEnum} from '../../enum/user-type-enum';

export interface VMenuReq {
  title: string;
  link: string;
  icon: string;
  sort: number;
  isShow: boolean;
  perms: string;
  type: number;
  userType: UserTypeEnum;
  id?: string;
  clientId?: string;
  parentId?: string;
}
