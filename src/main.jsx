import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-gradient-to-r from-purple-50 to-pink-50'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>,
)
