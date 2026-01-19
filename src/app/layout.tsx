import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forja de Personagens D&D 5e",
  description: "Crie personagens de D&D 5ª Edição com um wizard completo e intuitivo. Veja sua ficha atualizar em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
