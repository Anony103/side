import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserAuth } from "../../config/AuthContext";
import Carts from "../pages/Carts";

const navigation = [
   { name: 'Home', to: '/', current: true },
  { name: 'Course Overview', to: '/courses', current: false },
  { name: 'Team', to: '/team', current: false },
  {
    name: 'More',
    current: false,
    subitems: [
      { name: 'About', to: '/about' },
      { name: 'Contact', to: '/contact' },
    ],
  },
  { name: 'About', to: '/about', current: false },
  { name: 'Contact', to: '/contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {user, logOut, fetchCartItems, removeFromCart} = UserAuth() 
  const [userCartItems, setUserCartItems] = useState([]);


  const handleRemoveFromCart = async (itemId) => {
    try {
      if (user && user.uid) {
        const userId = user.uid;
        await removeFromCart(userId, itemId);
        const updatedCartItems = await fetchCartItems(userId);
         setUserCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };
  

  useEffect(() => {
    if (user && user.uid) {
      const userId = user.uid;
      fetchCartItems(userId)
        .then((items) => {
          setUserCartItems(items);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error.message);
        });
    }
  }, [user, fetchCartItems]);


  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error)
    }
  };

  console.log(userCartItems)
 
  
  return (
    <div className="sticky top-0 z-50 bg-tahiti border-b border-gray-500">
      {/* Cart Popup */}
      {isCartOpen && (
        <Carts
        userCartItems={userCartItems}
        handleRemoveFromCart={handleRemoveFromCart}
        toggleCart={toggleCart}
      />
      )}
    <Disclosure as="nav" className=" bg-tahiti text-white sticky top-0 z-10 border-b border-gray-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                    {/* Place GLOBAL LEADERSHIP INSTITUTION centered on smaller screens */}
              <NavLink to="/" className="hidden lg:flex items-center">
                <h1 className="text-xs font-serif font-bold md:text-lg">GLOBAL LEADERSHIP INSTITUTION</h1>
              </NavLink>

              {/* Show GLOBAL LEADERSHIP INSTITUTION centered on smaller screens */}
              <NavLink to="/" className="lg:hidden flex items-center absolute inset-y-0 left-1/2 transform -translate-x-1/2">
                <h1 className="text-xs font-serif font-bold md:text-lg">GLOBAL LEADERSHIP INSTITUTION</h1>
              </NavLink>

                </div>
                <div className="hidden lg:ml-6 lg:block">
  <div className="flex space-x">
    {navigation.map((item) =>
      item.subitems ? (
        <Disclosure key={item.name} as="div" className="relative inline-block text-left">
          <Disclosure.Button className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-amber-300',
            'rounded-md px-3 py-2 text-sm font-medium font-sans'
          )}>
            {item.name}
          </Disclosure.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-blue py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {item.subitems.map((subitem) => (
                  <NavLink
                    key={subitem.name}
                    to={subitem.to}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    {subitem.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      ) : (
        <NavLink
          key={item.name}
          to={item.to}
          className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-amber-300',
            'rounded-md px-3 py-2 text-sm font-medium font-sans'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </NavLink>
      )
    )}
  </div>
  </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
               type="button"
                onClick={toggleCart}
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                  </svg>
                  {userCartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {userCartItems.length}
                  </div>
                   )}
                </button>
                {user?.displayName ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-3 flex items-center">
                  <div className="sm:flex items-center space-x-2"> {/* Added 'flex', 'items-center', and 'space-x-2' */}
                    <img
                       className="h-8 w-8 rounded-full"
                        src={user?.photoURL}
                        alt=""
                        />
                     <div className="hidden sm:block">
                      <h1 className="text-white font-serif text-md font-medium">{user?.displayName}</h1>
                      </div>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-blue py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="#"
                            className={classNames(active ? 'text-amber-300' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Your Profile
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="#"
                            onClick={handleLogout}
                            className={classNames(active ? 'text-amber-300' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Sign out
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                ) : (
                  <NavLink to="/login" className="text-white sm:flex items-center space-x-2 ml-1">
                   
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 rounded-full bg-gray-300 text-black p-2 hidden sm:block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>



                    <h2>Login</h2>
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 px-2 pb-3 pt-2">
    {navigation.map((item) =>
      item.subitems ? (
        <Disclosure key={item.name} as="div" className="relative inline-block text-left">
          <Disclosure.Button className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-amber-300',
            'rounded-md px-3 py-2 text-sm font-medium font-sans'
          )}>
            {item.name}
          </Disclosure.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-blue py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {item.subitems.map((subitem) => (
                  <NavLink
                    key={subitem.name}
                    to={subitem.to}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    {subitem.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      ) : (
        <NavLink
          key={item.name}
          to={item.to}
          className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium font-sans'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </NavLink>
      )
    )}
  </div>
</Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
  )
}