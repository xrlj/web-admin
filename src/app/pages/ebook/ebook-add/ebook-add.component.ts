import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UEditorConfig} from '../../../helpers/ueditor-config';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {UIHelper} from '../../../helpers/ui-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ApiPath} from '../../../api-path';
import {HttpUtils} from '../../../helpers/http/HttpUtils';
import {EbookFolderService} from '../ebook-folder/ebook-folder.service';
import {VBookMenuResp} from '../../../helpers/vo/resp/v-book-menu-resp';
import {MyValidators} from '../../../helpers/MyValidators';
import {FileUploadHelper} from '../../../helpers/file-upload-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {EbookAddService} from './ebook-add.service';
import {Constants} from '../../../helpers/constants';

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
  description: any;

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
              private defaultBusService: DefaultBusService, private ebookAddService: EbookAddService,
              private router: Router) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      bookMenuId: [null, [Validators.required]],
      languageType: [null, [Validators.required]],
      bookName: [null, [Validators.required, MyValidators.maxLength(120)]],
      bookSubName: [null, [MyValidators.maxLength(150)]],
      author: [null, [Validators.required, MyValidators.maxLength(80)]],
      publishTime: [null, [Validators.required]],
      isbn: [null, [MyValidators.maxLength(50)]],
      pages: [null, null],
      description: [null, null]
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initSelectCategoryList();
    this.initEditFrom();
  }

  initEditFrom(): void {
    if (this.id === '0') {
      return;
    }
    this.ebookAddService.get(this.id)
      .ok(data => {
        console.log(data);
        this.addOrEditForm.patchValue({
          bookMenuId: data.bookMenuId,
          languageType: data.languageType,
          bookName: data.bookName,
          bookSubName: data.bookSubName,
          author: data.author,
          publishTime: data.publishTime,
          isbn: data.isbn,
          pages: data.pages,
          description: data.description
        });
        this.selectCategory = data.bookMenuId;
        this.description = data.description;
        this.coverFileId = data.coverFileId;
        // tslint:disable-next-line:no-non-null-assertion
        const coverFileInfo = data.extra.coverFileInfo!;
        this.coverImg = coverFileInfo.url;
        if (data.extra.pdfFileInfo) {
          const pdfFileInfo = data.extra.pdfFileInfo;
          const pdfFile: NzUploadFile = {name: pdfFileInfo.oriName, uid: pdfFileInfo.id, status: 'done', url: pdfFileInfo.url, response: {data: pdfFileInfo}};
          this.pdfFileList = [pdfFile];
        }
        if (data.extra.epubFileInfo) {
          const epubFileInfo = data.extra.epubFileInfo;
          const epubFile: NzUploadFile = {name: epubFileInfo.oriName, uid: epubFileInfo.id, status: 'done', url: epubFileInfo.url, response: {data: epubFileInfo}};
          this.ePubFileList = [epubFile];
        }
      })
      .fail(error => {
      })
      .final(b => {
      });
  }

  /**
   * 初始化获取书籍类别选择列表。
   */
  initSelectCategoryList(): void {
    this.ebookFolderService.getListTree({bookMenuName: ''})
      .ok(data => {
        this.patchSelectTree(data);
        this.selectCategoryList = data;
      }).final(b => {
      if (b) {

      }
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

  resetForm(): void {
    this.coverFileId = null;
    this.coverImg = null;
    this.pdfFileList = [];
    this.ePubFileList = [];
    this.description = '';

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
      const isLtLimitM = file.size! / 1024 / 1024 < Constants.fileUpload.ebookUploadSize;
      if (!isLtLimitM) {
        this.uiHelper.msgTipError(`文件大小不能超过${Constants.fileUpload.ebookUploadSize}MB！`);
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
    if (this.addOrEditForm.valid) {
      if (!this.coverFileId) {
        this.uiHelper.msgTipWarning('请上传封面图片！');
        return;
      }
      if (!this.description || this.description === '') {
        this.uiHelper.msgTipWarning('请输入描述！');
        return;
      }
      const bb = (this.pdfFileList && this.pdfFileList.length === 0) && (this.ePubFileList && this.ePubFileList.length === 0);
      if (bb) {
        this.uiHelper.msgTipWarning('请上传相应电子书');
        return;
      }

      const values = this.addOrEditForm.value;
      values.coverFileId = this.coverFileId;
      values.description = this.description;

      if (this.pdfFileList && this.pdfFileList.length > 0) {
        values.pdfFileId = this.pdfFileList[0].response.data.id;
      } else {
        values.epubFileId = null;
      }
      if (this.ePubFileList && this.ePubFileList.length > 0) {
        values.epubFileId = this.ePubFileList[0].response.data.id;
      } else {
        values.epubFileId = null;
      }

      this.defaultBusService.showLoading(true);
      if (id === '0') { // 新增
        this.ebookAddService.save(values)
          .ok(data => {
            this.uiHelper.msgTipSuccess('新增成功');
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
            if (b) {
              this.resetForm();
            }
          });
      } else { // 编辑
        values.id = id;
        console.log(values);
        this.ebookAddService.update(values)
          .ok(data => {
            console.log(data);
            if (data) {
              this.uiHelper.msgTipSuccess('修改成功');
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.ms);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      }
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  close() {
    this.defaultBusService.closeTabUrl(this.router.url);
  }
}
