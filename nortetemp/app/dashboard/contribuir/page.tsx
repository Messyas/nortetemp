'use client';

import { useEffect, useRef, useState } from 'react';
import { QrCodePix } from 'qrcode-pix';
import domtoimage from 'dom-to-image';
import { Button } from '@/app/ui/button';

export default function Page() {
  const [qrCode, setQrCode] = useState<string>('');
  const [codigoPix, setCodigoPix] = useState<string>('');
  const divRef = useRef(null);

  const chavePix = '70252578260';
  const nome = 'Messyas Gois Franca'; // Altere para o nome real do recebedor
  const cidade = 'Manaus'; // Altere para a cidade real
  const valor = 10; 

  // Gera o QR Code Pix
  useEffect(() => {
    async function generatePix() {
      const qrcodePix = QrCodePix({
        version: '01',
        key: chavePix,
        name: nome,
        city: cidade,
        transactionId: 'doacao-pix',
        message: 'Ajude nosso projeto!',
        value: valor,
      });

      setCodigoPix(qrcodePix.payload());
      setQrCode(await qrcodePix.base64());
    }

    generatePix();
  }, []);

  // Baixar QR Code como imagem
  function downloadQRCode() {
    if (!divRef.current) return;

    domtoimage.toPng(divRef.current).then((url: string) => {
      const link = document.createElement('a');
      link.download = 'qrcode-pix.png';
      link.href = url;
      link.click();
    });
  }

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-md shadow-md max-w-lg mx-auto text-center">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Contribua com a plataforma! 🚀
      </h2>
      <p className="text-gray-600 mb-6">
        Ajude-nos a manter nosso projeto! Escaneie o QR Code abaixo ou copie o código Pix.
      </p>

      {/* Exibe o QR Code */}
      {qrCode && (
        <div ref={divRef} className="p-4 bg-white rounded-md shadow-sm inline-block">
          <img src={qrCode} alt="QR Code Pix" className="w-48 h-48 mx-auto" />
        </div>
      )}

      {/* Exibe o Código Pix para cópia */}
      <p className="mt-4 text-sm text-gray-700">Código Pix:</p>
      <p className="text-sm font-mono bg-gray-200 p-2 rounded-md">{codigoPix}</p>

      {/* Botões para baixar e copiar */}
      <div className="flex gap-3 mt-4 justify-center">
        <Button onClick={downloadQRCode}>Baixar QR Code</Button>
        <Button onClick={() => navigator.clipboard.writeText(codigoPix)}>
          Copiar Código Pix
        </Button>
      </div>
    </div>
  );
}
