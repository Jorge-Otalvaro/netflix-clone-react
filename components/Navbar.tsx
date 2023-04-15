import React, { useCallback, useEffect, useState } from 'react';

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
    
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu(!showMobileMenu);
    }, []);

    return (
        <nav className="w-full fixed -z-40">
            <div className="
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                trasition
                duration-500
                bg-zinc-900
                bg-opacity-90
            ">
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Inicio"/>
                    <NavbarItem label="Series"/>
                    <NavbarItem label="Películas"/>
                    <NavbarItem label="Novedades populares"/>
                    <NavbarItem label="Mi lista"/>
                    <NavbarItem label="Explora por idiomas"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">
                        Explorar
                    </p>
                    <BsChevronDown className="text-white transition"/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;