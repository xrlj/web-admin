export interface VCustomerAccountResp {
  /**
   * 用户id。
   */
  userId: string;
  /**
   * 企业id。
   */
  etpId: string;
  /**
   * 账号名称。
   */
  username: string;
  /**
   * 真实姓名。
   */
  realName: string;
  /**
   * 企业全称。
   */
  etpName: string;
  /**
   * 账户手机号码。
   */
  mobile: string;
  /**
   * 账号状态。
   */
  status: number;
  /**
   * 账号状态名称。
   */
  statusName: string;
  /**
   * 创建时间。
   */
  dateCreated: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
