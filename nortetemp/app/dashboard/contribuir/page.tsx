"use client";

import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

export default function Page() {
  const pixCode =
    "00020101021126360014br.gov.bcb.pix0114+55929852227795204000053039865802BR5914MESSYAS FRANCA6006MANAUS62070503***63041133";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Container centralizado */}
      <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col">
        {/* Cabeçalho e imagem ao lado */}
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
            🌤️ NorTemp - Monitorando o Tempo por Você
          </h1>
          <div>
            <Image
              src="/loginicon.png"
              width={180}
              height={136}
              className="hidden md:block"
              alt="Ícone que mostra uma nuvem"
            />
          </div>
        </div>

        {/* Corpo do texto */}
        <div className="text-justify text-gray-700 leading-relaxed mb-8">
          <p className="mb-4">
            O <strong>NorTemp</strong> é um projeto idealizado por{" "}
            <strong>Messyas e Lucas Medeiros</strong> com o propósito de
            oferecer alertas periódicos sobre as condições climáticas. Nossa
            missão é garantir que você esteja sempre bem informado sobre
            mudanças no clima, permitindo uma melhor organização e planejamento
            do seu dia a dia.
          </p>
          <p className="mb-4">
            Utilizamos tecnologia confiável para coletar e fornecer informações
            atualizadas, possibilitando que nossos usuários tomem decisões
            baseadas em dados precisos. Nosso compromisso é manter você um passo
            à frente das mudanças climáticas.
          </p>
        </div>

        {/* Imagens dos criadores */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-32 mb-16">
          <div className="flex flex-col items-center">
            <Image
              src="/messyas.png"
              width={270}
              height={204}
              className="block md:block"
              alt="Imagem do Messyas"
            />
            <p className="mt-2 font-semibold text-gray-800">Messyas G.France</p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/lucas.png" 
              width={270}
              height={204}
              className="block md:block"
              alt="Imagem do Lucas"
            />
             <p className="mt-2 font-semibold text-gray-800">Lucas Henrique Medeiros</p>
          </div>
        </div>

        {/* QR Code e texto de contribuição */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            📲 Faça uma Contribuição via Pix
          </h2>
          <QRCodeCanvas value={pixCode} size={200} level="H" />
          <p className="mt-2 text-sm text-gray-600 text-center">
            Escaneie o QR Code para apoiar nossa iniciativa.
          </p>
        </div>
      </div>
    </div>
  );
}
