import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EbookFolderService} from './ebook-folder.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {VBookMenuResp} from '../../../helpers/vo/resp/v-book-menu-resp';
import {MyValidators} from '../../../helpers/MyValidators';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-ebook-folder',
  templateUrl: './ebook-folder.component.html',
  styleUrls: ['./ebook-folder.component.less']
})
export class EbookFolderComponent implements OnInit {

  folderName = ''; // 查询条件

  listOfMapData: VBookMenuResp[];
  mapOfExpandedData: { [key: string]: VBookMenuResp[] } = {};
  isRefreshList = false;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;
  selectCategoryList = [];
  parentId: string; // key即id
  editId: string; // 编辑记录id

  constructor(private fb: FormBuilder, private ebookFolderService: EbookFolderService,
              private uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      nameZh: [null, [MyValidators.required, MyValidators.maxLength(20)]],
      nameEn: [null, [MyValidators.required, MyValidators.maxLength(40), MyValidators.notChinese]],
      parentId: [null, null]
    });
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.isRefreshList = true;
    this.ebookFolderService.getListTree({bookMenuName: this.folderName})
      .ok(data => {
        this.patchSelectTree(data);
        this.listOfMapData = data;
        this.listOfMapData.forEach(item => {
          this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
        });
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(b => {
        this.isRefreshList = false;
      });
  }

  resetAddOrEditModal(): void {
    this.isShowModal = false;
    this.dialogType = 1;
    this.isOkLoading = false;
    this.parentId = null;
    this.addOrEditForm.reset();
  }

  convertTreeToList(root: VBookMenuResp): VBookMenuResp[] {
    const stack: VBookMenuResp[] = [];
    const array: VBookMenuResp[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: false});

    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({...node.children[i], level: node.level! + 1, expand: false, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: VBookMenuResp, hashMap: { [key: string]: boolean }, array: VBookMenuResp[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  collapse(array: VBookMenuResp[], data: VBookMenuResp, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  add(item?: VBookMenuResp) {
    this.dialogType = 1;
    this.isShowModal = true;
    if (item) {
      this.parentId = item.id;
    }
    this.initSelectTreeList();
  }

  edit(item: VBookMenuResp) {
    this.dialogType = 2;
    this.isShowModal = true;
    this.editId = item.id;
    this.parentId = item.parentId;
    this.addOrEditForm.patchValue({nameZh: item.nameZh, nameEn: item.nameEn, parentId: item.parentId});
    this.initSelectTreeList();
  }

  initSelectTreeList(): void {
    this.ebookFolderService.getListTree({bookMenuName: ''})
      .ok(data => {
        this.patchSelectTree(data);
        this.selectCategoryList = data;
      })
  }

  del(id: any) {
    this.uiHelper.modalDel('确定删除？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.ebookFolderService.del(id)
          .ok(data => {
            if (data) {
              this.uiHelper.msgTipSuccess('删除成功');
              setTimeout(() => {
                this.search();
              }, 200);
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          })
      });
  }

  refreshList() {
    this.resetAddOrEditModal();
    setTimeout(() => { // 刷新列表
      this.search();
    }, 200);
  }

  handleCancel() {
    this.resetAddOrEditModal();
  }

  handleOk() {
    if (this.addOrEditForm.valid) {
      this.isOkLoading = true;
      if (this.dialogType === 1) { // 新增
        const value = this.addOrEditForm.value;
        this.ebookFolderService.save(value)
          .ok(data => {
            if (data && data !== '') {
              this.uiHelper.msgTipSuccess('新增成功');
              this.refreshList();
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.isOkLoading = false;
          });
      } else { // 编辑
        const value = this.addOrEditForm.value;
        value.id = this.editId;
        this.isOkLoading = true;
        this.ebookFolderService.update(value)
          .ok(data => {
            if (data) {
              this.uiHelper.msgTipSuccess('更新成功');
              this.refreshList();
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.isOkLoading = false;
          });
      }
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  onChange($event: any) {
    console.log(`key(id) = ${$event}`);
  }

  patchSelectTree(dataList: VBookMenuResp[]): void {
    if (!dataList) {
      return;
    }
    dataList.forEach(value => {
      value.key = value.id;
      value.expand = false;
      value.title = `${value.nameZh}(${value.nameEn})`;
      const children = value.children;
      if (children === null || children === undefined || children.length === 0) {
        value.isLeaf = true;
        value.children = null;
      } else {
        this.patchSelectTree(children);
      }
    });
  }
}
