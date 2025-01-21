'use client';

import {
  HomeIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  CurrencyDollarIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import useAuthUser from '@/app/hooks/use-auth-user';

export default function NavLinks() {
  const user = useAuthUser();
  const pathname = usePathname();

  // Criação dos links de navegação com base no tipo de usuário
  const userLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  ];

  if (user) {
    // Adiciona a página de configurações para todos os usuários autenticados
    if (!userLinks.find(link => link.href === '/dashboard/configuracoes')) {
      userLinks.push({
        name: 'Configurações',
        href: '/dashboard/configuracoes',
        icon: Cog6ToothIcon,
      });
    }
    
    if (!userLinks.find(link => link.href === '/dashboard/contribuir')) {
      userLinks.push({
        name: 'Contribua',
        href: '/dashboard/contribuir',
        icon: CurrencyDollarIcon,
      });
    }

    // Adiciona página de jornalista, se o usuário for jornalista
    if (user.userCategory === 'jornalista') {
      userLinks.push({
        name: 'Jornalista',
        href: '/dashboard/jornalista',
        icon: PencilSquareIcon,
      });
    }

    // Adiciona página de agricultor, se o usuário for agricultor
    if (user.userCategory === 'agricultor') {
      userLinks.push({
        name: 'Agricultor',
        href: '/dashboard/agricultor',
        icon: SunIcon, 
      });
    }
  }

  return (
    <>
      {userLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-500 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-500': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
