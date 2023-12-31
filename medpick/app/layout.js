import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './context/user'
import CartProvider from './context/cart'




export const metadata = {
  title: 'Medpick',
  description: 'Medpick is a platform for buying and selling medical equipment.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div>
          <ToastContainer />

          <UserProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </UserProvider>
        </div>
        </body>
    </html>
  )
}
