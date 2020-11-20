import {VBaseResp} from './v-base-resp';

export interface VLoginResp extends VBaseResp {
  data: VLoginRespData;
}

export interface VLoginRespData {
  access_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}
