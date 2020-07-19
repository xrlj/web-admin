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
   * 企业类型。
   */
  enterpriseType?: number;
}
