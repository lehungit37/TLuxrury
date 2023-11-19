export interface IEgovSynchronized {
  id: string;
  linhVuc: string;
  linhVucId: number;
  thuTucHanhChinh: string;
  thuTucHanhChinhId: number;
  maThuTucHanhChinh: string;
  coQuanTiepNhanId: number;
  coQuanTiepNhan: string;
  maCoQuanTiepNhan: string;
  trichYeu: string;
  maSoBienNhan: string;
  maSoHoSo: string;
  chuHoSo: string;
  cmndChuHoSo: string;
  dienThoaiChuHoSo: string;
  diaChiChuHoSo: string;
  nguoiNopHoSoId: number;
  nguoiNopHoSo: string;
  cmndNguoiNopHoSo: string;
  dienThoaiNguoiNopHoSo: string;
  emailNguoiNopHoSo: string;
  diaChiNguoiNopHoSo: string;
  ngayNhan: string;
  ngayHenTra: string;
  hanXuLyTaiDonVi: string;
  ngayXuLyXongTaiDonVi: string;
  ngayXuLyXong: string;
  ngayTraKetQua: string;
  trangThaiHoSo: string;
  trangThaiHoSoId: number;
  noiDungTrangThai: string;
  ghiChu: string;
  ngayCapNhatHoSo: string;
  canBoXuLy: string;
  canBoXuLyId: number;
  canBoXuLyEmail: string;
  loaiHoSoId: number;
  loaiHoSo: string;
  emailCanBoXuLyChinh: string;
  tenCanBoXuLyChinh: string;
  tenPhongXuLyChinh: string;
  daXoa: number;
  listKetQua: {
    id: number;
    soVanBan: string;
    ngayBanHanh: string;
    trichYeu: string;
    coQuanBanHanhId: number;
    hinhThucKetThuc: number;
    qlvbdhId: number;
    fileDinhKems: {
      name: string;
      url: string;
    }[];
    hanhDongMau: string;
  }[];
  canBoTiepNhanId: number;
  emailCanBoTiepNhan: string;
  tenCanBoTiepNhan: string;
  tinhHinhXuLyTaiDonVi: string;
  tinhHinhXuLyChung: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IEgovSynchronizedFilter {
  searchKeyword: string;
  startTime: string;
  endTime: string;
  page: number;
  limit: number;
}
