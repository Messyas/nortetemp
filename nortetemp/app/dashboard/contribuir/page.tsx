"use client";

import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

export default function Page() {
  const pixCode =
    "00020101021126360014br.gov.bcb.pix0114+55929852227795204000053039865802BR5914MESSYAS FRANCA6006MANAUS62070503***63041133";

  return (
    <div className="h-screen w-full flex flex-col p-8 bg-gray-50">
      {/* Cabeçalho e imagem ao lado */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
            🌤️ NorTemp - Monitorando o Tempo por Você
          </h1>
        </div>
        <div className="flex-shrink-0">
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
      <div className="flex-1 text-justify text-gray-700 leading-relaxed">
        <p className="mb-4">
          O <strong>NorTemp</strong> é um projeto idealizado por{" "}
          <strong>Messyas e Lucas Medeiros</strong> com o propósito de oferecer
          alertas periódicos sobre as condições climáticas. Nossa missão é
          garantir que você esteja sempre bem informado sobre mudanças no
          clima, permitindo uma melhor organização e planejamento do seu dia a
          dia.
        </p>
        <p className="mb-4">
          Utilizamos tecnologia confiável para coletar e fornecer informações
          atualizadas, possibilitando que nossos usuários tomem decisões
          baseadas em dados precisos. Nosso compromisso é manter você um passo
          à frente das mudanças climáticas.
        </p>
      </div>

      {/* QR Code e imagem ao lado */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-2">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            📲 Faça uma Contribuição via Pix
          </h2>
          <QRCodeCanvas value={pixCode} size={200} level="H" />
          <p className="mt-2 text-sm text-gray-600 text-center">
            Escaneie o QR Code para apoiar nossa iniciativa.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/loginicon.png"
            width={180}
            height={136}
            className="hidden md:block"
            alt="Ícone que mostra uma nuvem"
          />
        </div>
      </div>
    </div>
  );
}
