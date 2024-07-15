import React from 'react'
import { useState, useRef, useEffect } from "react"
import logo from '../../../assets/logoCapz.png'

const ProfileDropDown = (props) => {
   
   const [state, setState] = useState(false)
   const profileRef = useRef()



   
   useEffect(() => {
       const handleDropDown = (e) => {
           if (!profileRef.current.contains(e.target)) setState(false)
       }
       document.addEventListener('click', handleDropDown)
   }, [])

   return (
       <div className={`relative ${props.class}`}>
           <div className="flex items-center space-x-4">
               <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                   onClick={() => setState(!state)}
               >
                   <img
                       src="" alt=''
                       className="w-full h-full rounded-full"
                   />
               </button>
              
           </div>

       </div>
   )
}
const Navbar1 = () => {
 
   
   // Profile Dropdown
       const [menuState, setMenuState] = useState(false)
   
     // Replace javascript:void(0) path with your path
     const navigation = [
         { title: "Home", path: "javascript:void(0)" },
         { title: "Services", path: "javascript:void(0)" },
         { title: "About Us", path: "javascript:void(0)" },
         { title: "Partners", path: "javascript:void(0)" },
     ]
     return (
           <nav className="sticky bg-white border-b top-0 z-50">
               <div className=" flex items-center space-x-8 py-3 px-4 max-w-screen-2xl mx-auto md:px-8">
                   <div className="flex-none lg:flex-initial">
                       <a href="javascript:void(0)">
                           <img
                               src={logo} 
                               width={120} 
                               height={50}
                               alt="UI logo"
                           />
                       </a>
                   </div>
                   <div className="flex-1 flex items-center justify-between">
                       <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                           <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                               {
                                   navigation.map((item, idx) => (
                                       <li key={idx} className="text-black hover:text-gray-900">
                                           <a href={item.path}>
                                               {item.title}
                                           </a>
                                       </li>
                                   ))
                               }
                           </ul>
                         
                       </div>
                       <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                           <form className="flex items-center space-x-2 bg-white shadow-lg rounded-full p-2">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-none text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                               </svg>
                               <input
                                   className="w-full outline-none appearance-none placeholder-gray-800 text-gray-500 sm:w-auto"
                                   type="text"
                                   placeholder="Search"
                               />
                           </form>
                          
                           <button 
                               className="outline-none text-gray-400 block lg:hidden"
                               onClick={() => setMenuState(!menuState)}
                           >
                               {
                                   menuState ? (
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                       </svg>
                                   ) : (
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                       </svg>
                                   )
                               }
                           </button>
                       </div>
                   </div>
               </div>
           </nav>
       )
   }
export default Navbar1