'use client';

import {
  HomeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import useAuthUser from '@/app/hooks/use-auth-user';

export default function NavLinks() {
  const user = useAuthUser();
  const pathname = usePathname();

  // Cria uma cópia dos links sem modificar o array original
  const userLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon }
  ];

  // Condicionalmente adiciona o link de Configurações
  if (user && !userLinks.find(link => link.href === '/dashboard/configuracoes')) {
    userLinks.push({
      name: "Configurações",
      href: "/dashboard/configuracoes",
      icon: Cog6ToothIcon
    });
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
