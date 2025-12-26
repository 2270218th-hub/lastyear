
import { Participant, Prize } from './types.ts';

export const DEFAULT_PARTICIPANTS: Participant[] = [
  { id: '1', name: 'Minh Anh', code: 'NV001', avatar: 'https://picsum.photos/seed/1/100' },
  { id: '2', name: 'Quốc Bảo', code: 'NV024', avatar: 'https://picsum.photos/seed/2/100' },
  { id: '3', name: 'Hồng Ngọc', code: 'NV103', avatar: 'https://picsum.photos/seed/3/100' },
  { id: '4', name: 'Tuấn Kiệt', code: 'NV045', avatar: 'https://picsum.photos/seed/4/100' },
  { id: '5', name: 'Thanh Hà', code: 'NV067', avatar: 'https://picsum.photos/seed/5/100' },
  { id: '6', name: 'Gia Huy', code: 'NV089', avatar: 'https://picsum.photos/seed/6/100' },
];

export const DEFAULT_PRIZES: Prize[] = [
  { id: 'p1', name: 'Voucher 500k', icon: 'redeem' },
  { id: 'p2', name: 'iPhone 15 Pro', icon: 'smartphone' },
  { id: 'p3', name: 'Tai nghe Sony', icon: 'headphones' },
  { id: 'p4', name: 'Thẻ cào 200k', icon: 'confirmation_number' },
  { id: 'p5', name: 'Túi canvas xịn', icon: 'shopping_bag' },
];
