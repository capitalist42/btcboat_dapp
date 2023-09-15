import { FC, Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface HeaderProps {}

// const navigation = [
//     { name: 'Account', href: '/#/account', current: true },
// ]

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const Header: FC<HeaderProps> = (_props) => {
    return (
        <header className="bg-orange">
            
        </header>
    )
}
export default Header
