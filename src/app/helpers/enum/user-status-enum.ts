export enum UserStatusEnum {
  CHECK_INIT = 0, // 未提交审核
  CHECK_WAIT, // 待审核
  CHECK_PROCESSING, // 审核中
  CHECK_PASS, // 审核通过
  CHECK_FAILURE, // 审核不通过
  DISABLE, // 已禁用
  BLACK// 黑名单
}
