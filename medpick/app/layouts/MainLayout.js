'use client';
import TopMenu from './includes/Topmenu';
import MainHeader from './includes/MainHeader';
import SubMenu from './includes/SubMenu';
import Footer from './includes/Footer';

export default function MainLayout({ children }) {
  return (
    <>
        <div id = "Mainlayout" className="min-w-[1050px] max-w-[1300px] mx-auto">
          <div>
            <TopMenu />
            <MainHeader />
            
            {children}
            <Footer />
            

          </div>
        </div>
    </>
  )
}