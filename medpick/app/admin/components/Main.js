'use client';
import TopMenu from './Top';
import MainHeader from './Header';



export default function MainLayout({ children }) {
  return (
    <>
        <div id = "Mainlayout" className="min-w-[1050px] max-w-[1300px] mx-auto">
          <div>
            <TopMenu />
            <MainHeader />
            
            {children}
            
            

          </div>
        </div>
    </>
  )
}