import {NavEntry} from '@/ui/base/navbar/type';


export const NavEntries: NavEntry[] = [
  {
    href: '/',
    text: 'Positions & Orders',
    activeTextClassName: 'text-sky-400',
  },
  {
    href: '/px',
    text: 'Quotes',
    activeTextClassName: 'text-fuchsia-300',
  },
  {
    href: '/options',
    text: 'Options',
    activeTextClassName: 'text-emerald-400',
  },
];
