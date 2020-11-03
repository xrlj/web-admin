import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UEditorConfig} from '../../../helpers/ueditor-config';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {UIHelper} from '../../../helpers/ui-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ApiPath} from '../../../api-path';
import {Utils} from '../../../helpers/utils';
import {HttpUtils} from '../../../helpers/http/HttpUtils';

@Component({
  selector: 'app-ebook-add',
  templateUrl: './ebook-add.component.html',
  styleUrls: ['./ebook-add.component.less']
})
export class EbookAddComponent implements OnInit {

  labelSpan = 6;
  formControlSpan = 8;

  addOrEditForm: FormGroup;
  selectCategoryList = [];
  selectCategory: string;

  selectLanguageList = [];
  selectLanguage: string;

  uEditorConfig = new UEditorConfig();

  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

  coverLoading = false;
  coverUrl?: string;

  // pdf电子书
  pdfFileList: NzUploadFile[] = [
    /*{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }*/
  ];

  ePubFileList: NzUploadFile[] = [
    /*{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }*/
  ];

  id = '0'; // 书籍id，默认0=新增，否则编辑

  constructor(private fb: FormBuilder, private uiHelper: UIHelper,
              private activatedRoute: ActivatedRoute, private httpUtils: HttpUtils) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      parentCategory: [null, [Validators.required]],
      languageType: [null, [Validators.required]],
      bookName: [null, [Validators.required]],
      bookSubName: [null, [Validators.required]],
      author: [null, [Validators.required]],
      publishTime: [null, [Validators.required]],
      isbn: [null, null],
      pages: [null, null],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addOrEditForm.reset();
    for (const key in this.addOrEditForm.controls) {
      this.addOrEditForm.controls[key].markAsPristine();
      this.addOrEditForm.controls[key].updateValueAndValidity();
    }
  }

  onChange($event: any) {
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.uiHelper.msgTipError('只能上传图片格式！');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.uiHelper.msgTipError('图片大小不能超过2MB！');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line:no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.coverLoading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // tslint:disable-next-line:no-non-null-assertion
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.coverLoading = false;
          this.coverUrl = img;
        });
        break;
      case 'error':
        this.uiHelper.msgTipError('Network error')
        this.coverLoading = false;
        break;
    }
  }

  pdfUploadHandleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      const response = file.response;
      if (!response) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
        return;
      }

      const success = response.success;
      const code = response.code;
      const msg = response.msg;
      if (success) {
        this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        return;
      } else {
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
      file.url = file.response.url;
      return file;
    });

    this.pdfFileList = fileList;
  }

  ePubUploadHandleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.ePubFileList = fileList;
  }

}
