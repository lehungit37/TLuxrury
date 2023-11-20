import config from 'src/config';
import moment, { Moment } from 'moment';
import { FieldValues } from 'react-hook-form';
import { IMenuRoute } from 'src/types/route';
import { IUser } from 'src/types/user';
import { checkRenderRouteAndMenu } from './user';
import { Location } from 'react-router-dom';

export const findIndexItem = (array: any[], id: string) => {
  const index = array.findIndex((item) => item.id === id);

  return index;
};

export const formatDate = (date: string | Date) => {
  return moment(date).utc().format('DD/MM/YYYY HH:mm:ss');
};

export const convertMinMaxToArray = (
  min: number | string,
  max: number | string,
): { value: number; label: string }[] => {
  if (min && max) {
    return Array.from({ length: Number(max) - Number(min) + 1 }, (v, k) => {
      return {
        value: Number(k + Number(min)),
        label: String(k + Number(min)),
      };
    });
  }

  return [];
};

export const formatFilterToString = (array: { id: string; name: string }[]) => {
  return array.map((item) => item.id).join(',');
};

const formatSelectId = (value: string) => {
  const newValue = value === 'ALL' ? '' : value;

  return newValue;
};

export const formatFilterState = <T extends FieldValues>(data: T) => {
  const result = {} as FieldValues;

  Object.keys(data).forEach((key) => {
    result[key] = formatSelectId(data[key]);
  });
  return result as T;
};

export const getTimeWhenSubtractMinute = (time?: string | Date | Moment) => {
  const date = new Date(time as string);
  const numberMinuteFromStartHour = date.getMinutes();
  const numberSecondsFromStartHour = date.getSeconds();

  const typeMinute = numberMinuteFromStartHour <= 1 ? 'minute' : 'minutes';
  const typeSecond = numberSecondsFromStartHour <= 1 ? 'second' : 'seconds';

  return moment(time)
    .subtract(numberMinuteFromStartHour, typeMinute)
    .subtract(numberSecondsFromStartHour, typeSecond)
    .format();
};

export const formatTimeToUTC = (time: string | Date | Moment) => {
  return moment(new Date(time as string))
    .utc(true)
    .format();
};

export const isSiTechSystem = config.systemName === 'SITECH';
export const isSTNMT = config.systemName === 'STNMT';

export const checkShowMenu = (menu: IMenuRoute, me: IUser | null) => {
  if (me && menu.permission) {
    const isRender = checkRenderRouteAndMenu(me, menu.permission);

    if (!isRender) return false;
  }

  if (!menu.isShow) return false;

  return true;
};

export const checkMenuActive = (path: string, location: Location) => {
  return location.pathname === path;
};

export const formatNumberToVND = (number: number) => {
  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`;
};

export const formatTime = (time: Date | string | Moment) => {
  return moment(time).format('DD-MM-YYYY HH:mm');
};
