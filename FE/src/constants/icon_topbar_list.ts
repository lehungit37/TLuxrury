import {
  NotificationsNone,
  Notifications,
  // InstallMobileOutlined,
  // InstallMobile,
  // DisplaySettingsOutlined,
  // DisplaySettings,
  // HelpOutlineOutlined,
  // HelpOutline,
  // CampaignOutlined,
  // Campaign,
} from '@mui/icons-material';

import { IIconTopBar } from 'src/types/topbar';

const ICON_TOPBAR_LIST: IIconTopBar[] = [
  {
    id: 'notification',
    title: 'Thông báo',
    icon: NotificationsNone,
    activeIcon: Notifications,
  },
  // {
  //   id: 'downloadApp',
  //   title: 'Tải ứng dụng',
  //   icon: InstallMobileOutlined,
  //   activeIcon: InstallMobile,
  // },
  // {
  //   id: 'settingTheme',
  //   title: 'Thiết lập giao diện',
  //   icon: DisplaySettingsOutlined,
  //   activeIcon: DisplaySettings,
  // },
  // {
  //   id: 'help',
  //   title: 'Trợ giúp',
  //   icon: HelpOutlineOutlined,
  //   activeIcon: HelpOutline,
  // },
  // {
  //   id: 'whatNews',
  //   title: 'Có gì mới',
  //   icon: CampaignOutlined,
  //   activeIcon: Campaign,
  // },
];

export default ICON_TOPBAR_LIST;
