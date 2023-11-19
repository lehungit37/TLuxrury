export interface IPayloadVerifyPassword {
  token: string;
  email: string;
  password: string;
  userId: string;
}

export interface IGetDevice {
  props: {
    platform: string;
    os: string;
    browser: string;
    ip: string;
  };
  lastActivityAt: Date;
  id: string;
  token: string;
}
export interface IChangePassword {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
export interface IChangePhone {
  userId: string;
  phoneNumber: string;
  password: string;
}
