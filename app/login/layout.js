export default function RootLayout({ children }) {
  return (
    
        <div className=" min-h-[84vh] h-auto relative overflow-hidden">
           <div className="absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
          {children}
        </div>

  );
}
