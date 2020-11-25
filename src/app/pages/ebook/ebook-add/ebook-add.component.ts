import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UEditorConfig} from '../../../helpers/ueditor-config';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {UIHelper} from '../../../helpers/ui-helper';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ApiPath} from '../../../api-path';
import {HttpUtils} from '../../../helpers/http/HttpUtils';
import {EbookFolderService} from '../ebook-folder/ebook-folder.service';
import {VBookMenuResp} from '../../../helpers/vo/resp/v-book-menu-resp';
import {MyValidators} from '../../../helpers/MyValidators';
import {FileUploadHelper} from '../../../helpers/file-upload-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {EbookAddService} from './ebook-add.service';

@Component({
  selector: 'app-ebook-add',
  templateUrl: './ebook-add.component.html',
  styleUrls: ['./ebook-add.component.less']
})
export class EbookAddComponent implements OnInit {

  labelSpan = 6;
  formControlSpan = 9;

  addOrEditForm: FormGroup;
  selectCategoryList = [];
  selectCategory: string;

  selectLanguage: string;

  uEditorConfig = new UEditorConfig();

  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

  coverLoading = false;
  coverImg?: string;
  coverFileId: string; // 上传成功后文件id

  // pdf电子书
  pdfFileList: NzUploadFile[] = [];
  // ePub电子书
  ePubFileList: NzUploadFile[] = [];

  id = '0'; // 书籍id，默认0=新增，否则编辑

  constructor(private fb: FormBuilder, private uiHelper: UIHelper,
              private activatedRoute: ActivatedRoute, private httpUtils: HttpUtils,
              private ebookFolderService: EbookFolderService, private fileUploadHelper: FileUploadHelper,
              private defaultBusService: DefaultBusService, private ebookAddService: EbookAddService) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      bookMenuId: [null, [Validators.required]],
      languageType: [null, [Validators.required]],
      bookName: [null, [Validators.required, MyValidators.maxLength(120)]],
      bookSubName: [null, [Validators.required, MyValidators.maxLength(150)]],
      author: [null, [Validators.required, MyValidators.maxLength(80)]],
      publishTime: [null, [Validators.required]],
      isbn: [null, [MyValidators.maxLength(50)]],
      pages: [null, null],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.initSelectCategoryList();
  }

  initSelectCategoryList(): void {
    this.ebookFolderService.getListTree({bookMenuName: ''})
      .ok(data => {
        this.patchSelectTree(data);
        this.selectCategoryList = data;
      });
  }

  patchSelectTree(dataList: VBookMenuResp[]): void {
    if (!dataList) {
      return;
    }
    dataList.forEach(value => {
      value.title = `${value.nameZh}(${value.nameEn})`;
      value.key = value.id;
      value.expand = false;
      const children = value.children;
      if (children === null || children === undefined || children.length === 0) {
        value.isLeaf = true;
        value.children = null;
      } else {
        this.patchSelectTree(children);
      }
    });
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
        this.uiHelper.msgTipError('只能上传图片jpg、png格式！');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLt2M = file.size! / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.uiHelper.msgTipError(`图片大小不能超过3MB！`);
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

  /**
   * 封面图片上传回调。
   */
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
          this.coverImg = img;
        });
        const response = info.file.response;
        if (response && response.success) { // 上传成功
          this.coverFileId = response.data.id;
        } else {
          this.uiHelper.msgTipError('上传失败');
          this.coverFileId = null;
          this.coverImg = null;
          this.coverLoading = false;
        }
        break;
      case 'error':
        this.uiHelper.msgTipError('上传失败');
        this.coverLoading = false;
        this.coverImg = null;
        this.coverFileId = null;
        break;
    }
  }

  beforeUploadPdf = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isPdf = file.type === 'application/pdf';
      if (!isPdf) {
        this.uiHelper.msgTipError('请上传PDF格式文件！');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLtLimitM = file.size! / 1024 / 1024 < 150;
      if (!isLtLimitM) {
        this.uiHelper.msgTipError(`文件大小不能超过150MB！`);
        observer.complete();
        return;
      }
      observer.next(isPdf && isLtLimitM);
      observer.complete();
    });
  };

  pdfUploadHandleChange(info: NzUploadChangeParam): void {
    this.pdfFileList = this.fileUploadHelper.uploadFileListHandleChange(info, 1);
  }

  beforeUploadEPub = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isEPub = file.type === 'application/epub';
      if (!isEPub) {
        this.uiHelper.msgTipError('请上传EPUB格式文件！');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLtLimitM = file.size! / 1024 / 1024 < 150;
      if (!isLtLimitM) {
        this.uiHelper.msgTipError('文件大小不能超过150MB！');
        observer.complete();
        return;
      }
      observer.next(isEPub && isLtLimitM);
      observer.complete();
    });
  };

  ePubUploadHandleChange(info: NzUploadChangeParam): void {
    this.ePubFileList = this.fileUploadHelper.uploadFileListHandleChange(info, 1);
  }

  selectLanguageChange($event: string) {
    console.log($event);
  }

  submit(id?: string): void {
    this.defaultBusService.showLoading(true);
    /*if (this.addOrEditForm.valid) {
      if (!this.coverFileId) {
        this.uiHelper.msgTipWarning('请上传封面图片！');
        return;
      }
      if (this.pdfFileList && this.pdfFileList.length === 0) {
        this.uiHelper.msgTipWarning('请上传pdf格式电子书！');
        return;
      }
      const values = this.addOrEditForm.value;
      values.coverFileId = this.coverFileId;
      values.pdfFileId = this.pdfFileList[0].response.data.id;
      if (this.ePubFileList && this.ePubFileList.length > 0) {
        values.epubFileId = this.ePubFileList[0].response.data.id;
      } else {
        values.epubFileId = null;
      }
      if (id === '0') { // 新增
        console.log(values);
      } else { // 编辑
        values.id = id;
      }
      this.defaultBusService.showLoading(true);
      this.ebookAddService.save(values)
        .ok(data => {
          console.log(data);
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.defaultBusService.showLoading(false);
        });
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }*/
  }
}
