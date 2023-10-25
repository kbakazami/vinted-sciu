"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronDown, ChevronRight, List} from "@/app/_components/svg";
import Logout from "@/app/_components/user/Logout";

export default function AdminLayout({children}) {
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
            <div className={"bg-primary account-dashboard"}>
                <nav className={"custom-container mx-auto flex flex-col lg:flex-row py-6 text-white"}>
                    <p className={"text-secondary-darker lg:border-r-2 border-secondary-darker lg:pr-5 lg:mr-5 flex flex-row justify-between items-center"} onClick={displayAccount}>
                        Admin
                        <ChevronDown className="text-secondary-darker w-3 h-3 lg:hidden"/>
                    </p>
                    <ul className={"hidden lg:flex flex-col lg:flex-row gap-3 lg:gap-5"}>
                        <li>
                            <Link
                                className={`${pathname === '/admin/products' ? 'active' : ''}`}
                                href={"/admin/products"}>
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/admin/categories' ? 'active' : ''}`}
                                href={"/admin/categories"}>
                                Catégories
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/admin/services' ? 'active' : ''}`}
                                href={"/admin/services"}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/admin/services-categories' ? 'active' : ''}`}
                                href={"/admin/services-categories"}>
                                Catégorie des services
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${pathname === '/admin/users' ? 'active' : ''}`}
                                href={"/admin/users"}>
                                Utilisateurs
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={"custom-container"}>
                {children}
            </div>
        </>
    )
}