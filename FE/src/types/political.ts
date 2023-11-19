export interface IProvince {
  id: string;
  name: string;
}

export interface IDistrict {
  id: string;
  name: string;
  province: string;
}

export interface ICommune {
  id: string;
  name: string;
  district: string;
}
