import NorteLogo from '@/app/ui/NorteLogo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import Link from 'next/link';
import { lusitana } from './ui/fonts';

export default function Page() {
  return (
   <main className="flex min-h-screen flex-col p-6">
   <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    <NorteLogo />
   </div>
   <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
    <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
      <p className={`${lusitana.className} antialiased`}>
        <strong>Seja bem vindo!</strong> Esse é o NorTemp, seu app de alertas climáticos!
      </p>
      <div className="flex flex-row gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-5 rounded-lg border-2 border-blue-500 bg-white px-6 py-3 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-100 md:text-base"
        >
          <span>Vá para o dashboard</span> <ChartBarIcon className="w-5 md:w-6" />
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Fazer login</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
     </div>
     <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
           <Image
              src="/loginicon.png"
              width={400}
              height={304}
              className="hidden md:block"
              alt="Icone que mostra uma nuvem meu nobre."
           />
           <Image
              src="/loginicon.png"
              width={200}
              height={152}
              className="block md:hidden"
              alt="Icone que mostra uma nuvem meu nobre."
           />
    </div>
  </div>
</main>

  );
}
