import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{ 
    children: React.ReactNode;
  }>) {
    const loggedIn = {firstName:'John',lastname:'doe'};
    return ( 
      <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" alt="logooo" width={30} height={30}  />
          
          <div>
            <Navbar user={loggedIn}/>
          </div>
          </div>
        {children}
        </div>
      </main>
    );
  }