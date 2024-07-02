export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return ( 
      <main className="flex gap-3">
        Sidebarrrrrr
        {children}
      </main>
    );
  }