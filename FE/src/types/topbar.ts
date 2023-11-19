import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IIconTopBar {
  id: 'notification' | 'downloadApp' | 'settingTheme' | 'help' | 'whatNews';
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & {
    muiName: string;
  };
  activeIcon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & {
    muiName: string;
  };
}
