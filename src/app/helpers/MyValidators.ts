import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {NzSafeAny} from 'ng-zorro-antd';


// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {

  /**
   * 最小长度
   * @param minLength 最小长度
   */
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  /**
   * 最大长度
   * @param maxLength 长度
   */
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  /**
   * 校验手机号码
   */
  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }

  /**
   * 校验数字或者小数
   */
  static decimal(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isDecimal(value) ? null : { decimal: { 'zh-cn': `只能是数字或者小数`, en: `value is not valid` } };
  }

  /**
   * 中文
   */
  static chinese(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isChinese(value) ? null : { chinese: { 'zh-cn': `只能输入中文`, en: `Can be input chinese` } };
  }

  /**
   * 不包含中文字符串。
   */
  static notChinese(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return !isChinese(value) ? null : { chinese: { 'zh-cn': `不能包含中文`, en: `Can not be input chinese` } };
  }

  /**
   * 中文或英文
   */
  static chineseOrEnglish(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isChineseOrEnglish(value) ? null : { chineseOrEnglish: { 'zh-cn': `只能输入中文或英文`, en: `Can be input Chinese or English` } };
  }

  /**
   * 正整数
   */
  static positiveInteger(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isPositiveInteger(value) ? null : { positiveInteger: { 'zh-cn': `只能输入正整数`, en: `Can be only input positive integer` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

// 手机号码
function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}

// 数字或者带小数点的数字
function isDecimal(value: string): boolean {
  return typeof value === 'string' && /^\d+(\.\d+)?$/.test(value);
}

// 中文文字
const chineseReg = new RegExp('^[\u4E00-\u9FFF]+$');
function isChinese(value: string): boolean {
  return chineseReg.test(value);
}

// 是否中文或者英文
const chineseEnglishReg = new RegExp('^[a-zA-Z\u4E00-\u9FFF]+$');
function isChineseOrEnglish(value: string): boolean {
  return chineseEnglishReg.test(value);
}

// 正整数
function isPositiveInteger(value: string): boolean {
  return typeof value === 'string' && /^[0-9]*$/.test(value);
}


