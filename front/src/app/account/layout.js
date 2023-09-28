"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function AccountLayout({children}) {
    const pathname = usePathname();

    return (
        <>
            <div className={"bg-secondary account-dashboard"}>
                <nav className={"max-w-screen-2xl mx-auto  flex flex-row py-6"}>
                    <p className={"text-secondary-darker border-r-2 border-secondary-darker pr-5 mr-5"}>Mon profil</p>
                    <ul className={"flex flex-row gap-x-5"}>
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
                    </ul>
                </nav>
            </div>
            <div className={"max-w-screen-2xl mx-auto"}>
                {children}
            </div>
        </>
    )
}