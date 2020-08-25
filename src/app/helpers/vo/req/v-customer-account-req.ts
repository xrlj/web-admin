import {VPageReq} from './v-page-req';

export interface VCustomerAccountReq extends VPageReq {
  /**
   * 账户名称
   */
  username?: string;
  /**
   * 真实姓名
   */
  realName?: string;
  /**
   * 邀请注册类型。
   */
  userType?: number;
}
