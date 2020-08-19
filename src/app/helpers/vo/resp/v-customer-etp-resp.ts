export interface VCustomerEtpResp {
  /**
   * 企业id。
   */
  id: string;
  /**
   * 企业编码。
   */
  etpCode: string;
  /**
   * 企业全称。
   */
  etpName: string;
  /**
   * 企业联系人。
   */
  contactName: string;
  /**
   * 企业联系人电话。
   */
  contactMobile: string;
  /**
   * 企业状态
   */
  etpStatus: number;
  /**
   * 企业状态名称
   */
  etpStatusName: string;
  /**
   * 创建时间。
   */
  dateCreated: string;
  /**
   * 注册邀请。
   */
  registerInvitationUrl: string;
  /**
   * 注册状态
   */
  registerStatus: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
