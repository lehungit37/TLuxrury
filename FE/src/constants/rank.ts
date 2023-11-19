import { isSiTechSystem } from 'src/utils/function';

export interface ICardRank {
  lowValue: number;
  highValue: number;
  title: string;
  titleRank: string;
  color: string;
  colorText: string;
}

export const CWQIRank: ICardRank[] = [
  {
    lowValue: 0,
    highValue: 9,
    title: 'Ô nhiễm rất nặng',
    titleRank: '< 10',
    color: isSiTechSystem ? 'rgb(126,0,35)' : '#9C5973',
    colorText: ' white',
  },
  {
    lowValue: 10,
    highValue: 25,
    title: 'Kém',
    titleRank: '10 - 25',
    color: isSiTechSystem ? 'rgb(255,0,0)' : 'rgb(214 48 50)',
    colorText: ' white',
  },
  {
    lowValue: 26,
    highValue: 50,
    title: 'Xấu',
    titleRank: '26 - 50',
    color: isSiTechSystem ? 'rgb(255,126,0)' : '#FF954D',
    colorText: ' white',
  },
  {
    lowValue: 51,
    highValue: 75,
    title: 'Trung bình',
    titleRank: '51 - 75',
    color: isSiTechSystem ? 'rgb(255,255,0)' : '#F8C12C',
    colorText: ' white',
  },
  {
    lowValue: 76,
    highValue: 90,
    title: 'Tốt',
    titleRank: '76 - 90',
    color: isSiTechSystem ? 'rgb(0,228,0)' : 'rgb(46 125 50)',
    colorText: ' white',
  },
  {
    lowValue: 91,
    highValue: 100,
    title: 'Rất tốt',
    titleRank: '91 - 100',
    color: isSiTechSystem ? 'rgb(51,51,255)' : '#5ACEDE',
    colorText: ' white',
  },
];
export const CAQIRank: ICardRank[] = [
  {
    lowValue: 0,
    highValue: 50,
    title: 'Tốt',
    titleRank: '0 - 50',
    color: isSiTechSystem ? 'rgb(0,228,0)' : 'rgb(46 125 50)',
    colorText: 'white',
  },
  {
    lowValue: 51,
    highValue: 100,
    title: 'Trung bình',
    titleRank: '51 - 100',
    color: isSiTechSystem ? 'rgb(255,255,0)' : '#F8C12C',
    colorText: 'white',
  },
  {
    lowValue: 101,
    highValue: 150,
    title: 'Kém',
    titleRank: '101 - 150',
    color: isSiTechSystem ? 'rgb(255,126,0)' : '#FF954D',
    colorText: 'white',
  },
  {
    lowValue: 151,
    highValue: 200,
    title: 'Xấu',
    titleRank: '151 - 200',
    color: isSiTechSystem ? 'rgb(255,0,0)' : 'rgb(214 48 50)',
    colorText: 'white',
  },
  {
    lowValue: 201,
    highValue: 300,
    title: 'Rất xấu',
    titleRank: '201 - 300',
    color: isSiTechSystem ? 'rgb(143,63,151)' : '#8C63B8',
    colorText: 'white',
  },
  {
    lowValue: 301,
    highValue: 500,
    title: 'Nguy hại',
    titleRank: '301 - 500',
    color: isSiTechSystem ? 'rgb(126,0,35)' : '#8D4D66',
    colorText: 'white',
  },
];
