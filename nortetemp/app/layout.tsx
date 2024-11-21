import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import ConfigureAmplifyClientSide from './seed/amplify-cognito-config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <>
          <ConfigureAmplifyClientSide />
          {children}
        </>
      </body>
    </html>
  );
}
