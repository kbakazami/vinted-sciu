"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronDown, ChevronRight, List} from "@/app/_components/svg";
import Logout from "@/app/_components/user/Logout";

export default function AccountLayout({children}) {
    const pathname = usePathname();

    function displayAccount() {
        const accountNav = document.querySelector(".account-dashboard ul");
        const accountTitle = document.querySelector(".account-dashboard p");
        accountNav.classList.toggle('hidden');
        accountNav.classList.toggle('flex');
        accountTitle.classList.toggle('open');
    }

    return (
        <>
            <div className={"bg-secondary account-dashboard"}>
                <nav className={"custom-container mx-auto flex flex-col lg:flex-row py-6"}>
                    <p className={"text-secondary-darker lg:border-r-2 border-secondary-darker lg:pr-5 lg:mr-5 flex flex-row justify-between items-center"} onClick={displayAccount}>
                        Mon profil
                        <ChevronDown className="text-secondary-darker w-3 h-3 lg:hidden"/>
                    </p>
                    <ul className={"hidden lg:flex flex-col lg:flex-row gap-3 lg:gap-5"}>
                        <li>
                            <Link
                                className={`${pathname === '/account' ? 'active' : ''}`}
                                href={"/account"}>
                                Mes informations
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/account/wishlist' ? 'active' : ''}`}
                                href={"/account/wishlist"}>
                                Ma wishlist
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/account/products' ? 'active' : ''}`}
                                href={"/account/products"}>
                                Mes produits
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/account/reservations' ? 'active' : ''}`}
                                href={"/account/reservations"}>
                                Mes réservations
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/account/services' ? 'active' : ''}`}
                                href={"/account/services"}>
                                Mes services
                            </Link>
                        </li>
                    </ul>
                    <Logout/>
                </nav>
            </div>
            <div className={"custom-container"}>
                {children}
            </div>
        </>
    )
}