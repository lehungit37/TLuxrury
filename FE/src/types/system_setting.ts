export interface ISystemSetting {
  id: string;
  generalInfo: {
    systemName: string;
    copyright: string;
    version: string;
    address: string;
    email: string;
    phoneNumber: string;
  };
  smsService: {
    server: string;
    username: string;
    password: string;
    status: boolean;
  };
  emailService: {
    server: string;
    hostName: string;
    password: string;
    status: boolean;
  };
  zaloService: {
    server: string;
    appId: string;
    refreshToken: string;
    secretKey: string;
    status: boolean;
  };
  ftpService: {
    syncFtpStatus: boolean;
    dataFolderPath: string;
    backupFolderPath: string;
    errorFolderPath: string;
  };
  updatedAt: Date;
}
