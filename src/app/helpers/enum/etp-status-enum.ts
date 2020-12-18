export enum EtpStatusEnum { // 企业状态
  CHECK_WAIT = 0, // 待提交审核
  CHECK_PASS, // 已提交待审核
  VERIFIED_WAITING, // 实名认证中
  VERIFIED_PAYED, // 已对公打款
  VERIFIED_PASS, // 已实名认证
  CHECK_FAILURE, // 审核不通过
  DISABLE, // 已禁用
  BLACK// 黑名单
}
