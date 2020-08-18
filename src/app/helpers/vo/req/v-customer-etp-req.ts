import {VPageReq} from './v-page-req';

export interface VCustomerEtpReq extends VPageReq {
  /**
   * 企业全称。
   */
  etpName?: string;
  /**
   * 企业编码。
   */
  etpCode?: string;
  /**
   * 邀请注册类型。
   */
  userType?: number;
}
