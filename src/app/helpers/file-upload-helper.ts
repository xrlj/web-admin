import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Constants} from './constants';
import {AppPath} from '../app-path';
import {Utils} from './utils';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {VMenuResp} from './vo/resp/v-menu-resp';
import {NzTreeNode, NzUploadChangeParam, NzUploadFile, UploadChangeParam} from 'ng-zorro-antd';
import {ThemeEnum} from './enum/theme-enum';
import {HttpUtils} from './http/HttpUtils';
import {UIHelper} from './ui-helper';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadHelper {
  constructor(private uiHelper: UIHelper, private httpUtils: HttpUtils) {}

  /**
   * 上传文件，直接返回成功后response内容。
   */
  uploadFileHandleChange({ file, fileList }: NzUploadChangeParam, isTip?: boolean | false): any {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      const response = file.response;
      if (!response) {
        if (isTip) {
          this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
        }
        return;
      }

      const success = response.success;
      const code = response.code;
      const msg = response.msg;
      if (success) {
        if (isTip) {
          this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        }
        return response.data;
      } else {
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
    } else if (status === 'error') {
      if (isTip) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
      }
    }

    return undefined;
  }

  /**
   * 上传文件列表，限制文件列表个数。成功返回整个已经上传列表对象，否者返回undefined
   * @param file 当前上传文件
   * @param fileList 已上传文件列表
   * @param listLimit 限制文件列表个数，正整数。
   * @param isTip 是否提示
   */
  uploadFileListHandleChange({ file, fileList }: NzUploadChangeParam, listLimit: number, isTip?: boolean | false): NzUploadFile[] {
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-listLimit);

    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      const response = file.response;
      if (!response) {
        if (isTip) {
          this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
        }
        return;
      }

      const success = response.success;
      const code = response.code;
      const msg = response.msg;
      if (success) {
        if (isTip) {
          this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        }

        // 2. Read from response and show file link
        fileList = fileList.map(item => {
          if (item.response) {
            // Component will show file.url as link
            item.url = item.response.data.url;
          }
          return item;
        });
      } else {
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
    } else if (status === 'error') {
      if (isTip) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
      }
    } else if (status === 'removed') {
      console.log('删除本地已上传文件');
    }

    return fileList;
  }

  beforeUpload(file: NzUploadFile, _fileList: NzUploadFile[]): any {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.uiHelper.msgTipError('只能上传图片jpg、png格式！');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLt2M = file.size! / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.uiHelper.msgTipError('图片大小不能超过3MB！');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  }

 /* beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.uiHelper.msgTipError('只能上传图片jpg、png格式！');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLt2M = file.size! / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.uiHelper.msgTipError('图片大小不能超过3MB！');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };*/
}
