import {VPdtTypeTemplateResp} from './v-pdt-type-template-resp';

export interface VPdtTypeResp {
  id: string;
  key: string;
  pdtTypeName: string;
  pdtTypeCode: string;
  pdtTypeSort: number;
  pdtTypeShow: number | string;
  pdtTypeDesc: string;
  templates: VPdtTypeTemplateResp[];
  expand?: boolean;
}
