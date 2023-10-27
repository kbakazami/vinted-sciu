'use client';
import rucheCitoyenne from '../logos/Logo_Ruche_Citoyenne.png';
import wellnessCenter from '../logos/Logo_Wellness_Center.png';
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_components/button";
import {ChevronLeft, ChevronRight, Heart, Menu, Plus, Search, User} from "@/app/_components/svg";
import UserAuthenticated from "@/app/_components/navigation/user-authenticated";
import UserAddItems from "@/app/_components/navigation/user-add-items";
import {useEffect, useRef, useState} from "react";
import useOutsideClick from "@/app/_components/use-outside-click";
import {getCategories} from "@/app/utils/categories";
import {getServices} from "@/app/utils/services";
import {getServicesCategories} from "@/app/utils/service-categories";

export default function HeaderMobile() {
    const [showMenu, setShowMenu] = useState(false);
    const refMenu = useRef();

    const [categories, setCategories] = useState([]);
    const [servicesCategories, setServicesCategories] = useState([]);

    const subCategoryWrapper = document.querySelector('.sub-category-wrapper');
    const subServicesWrapper = document.querySelector('.sub-services-wrapper');

    const mobileLink = document.querySelectorAll("a");

    const body = document.querySelector('body');

    const getCategoriesAndServicesList = async () => {
        const categoriesList = await getCategories();
        setCategories(categoriesList);

        const servicesCategoriesList = await getServicesCategories();
        setServicesCategories(servicesCategoriesList);
    }

    useEffect(() => {
        getCategoriesAndServicesList();
    }, []);

    useOutsideClick(refMenu, () => {
        if (showMenu) {
            setShowMenu(false);
        }
    });

    mobileLink.forEach(link => {
        link.addEventListener('click', () => {
            setShowMenu(false);
        })
    })

    function showSubMenu (type) {

        if (type === 'categories' && categories.length !== 0) {
            subCategoryWrapper.classList.remove('translate-x-full');
            subCategoryWrapper.classList.add('translate-x-0');
        }

        if (type === 'services' && servicesCategories.length !== 0) {
            subServicesWrapper.classList.remove('translate-x-full');
            subServicesWrapper.classList.add('translate-x-0');
        }
    }

    useEffect(() => {
        showHideOverlay();
    }, [showMenu]);

    function showBaseMenu(type) {
        if (type === 'categories')
        {
            subCategoryWrapper.classList.remove('translate-x-0');
            subCategoryWrapper.classList.add('translate-x-full');
        }
        if (type === 'services') {
            subServicesWrapper.classList.remove('translate-x-0');
            subServicesWrapper.classList.add('translate-x-full');
        }
    }

    function showHideOverlay() {
        if(showMenu) {
            body.classList.add('overflow-y-hidden');
        } else {
            body.classList.remove('overflow-y-hidden');
        }
    }

    return (
        <header className={"lg:hidden px-4"}>
            <nav className={"flex flex-row items-center justify-between"}>
                <Link href={"/"} className={"w-[80px]"}>
                    <Image className={"w-auto h-[80px]"} src={rucheCitoyenne} alt={"Logo la ruche citoyenne"}/>
                </Link>
                <Image className={"block w-[135px] sm:w-[160px]"} src={wellnessCenter} alt={"Logo Wellness Center"}/>
                <div className={"w-[70px] flex justify-end"}>
                    <Button href={""} onClick={() => setShowMenu(!showMenu)} content="" className="btn-round btn-secondary nav">
                        <Menu className="text-secondary-darker"/>
                    </Button>
                </div>

                <div className={`${!showMenu && 'hidden'} absolute top-20 bg-white inset-x-0 bottom-0 pb-8 overflow-y-auto overflow-x-hidden nav-wrapper`} ref={refMenu}>
                    <ul className={"flex flex-col mx-auto text-sm"}>
                        <li>
                            <button onClick={() => showSubMenu('categories')} className={"mobile-link link-hover w-full text-left relative"}>
                                Catalogue
                                <ChevronRight className={"absolute right-4 w-6 h-6 top-1/2 -translate-y-1/2"}/>
                            </button>

                            <div className={"translate-x-full sub-category-wrapper"}>
                                <p onClick={() => showBaseMenu('categories')} className={"sub-category-title"}>
                                    <ChevronLeft className={"absolute left-4 w-6 h-6 top-1/2 -translate-y-1/2"}/>
                                    Catalogue
                                </p>
                                <div className={"flex flex-col"}>
                                    {
                                        categories.map((category, key) => {
                                            return (
                                                <Link key={key} href={`/catalog/${category.name}`} className={"mobile-link link-hover"}>
                                                    {category.name}
                                                </Link>
                                            )
                                        })
                                    }
                                    <Link href={"/catalog"} className={"see-all"}>
                                        Voir tout
                                    </Link>
                                </div>
                            </div>

                        </li>
                        <li>
                            <button onClick={() => showSubMenu('services')} className={"mobile-link link-hover w-full text-left relative"}>
                                Annonces & Services
                                {servicesCategories.length !== 0 &&
                                    <ChevronRight className={"absolute right-4 w-6 h-6 top-1/2 -translate-y-1/2"}/>
                                }
                            </button>
                            <div className={"translate-x-full sub-services-wrapper"}>
                                <p onClick={() => showBaseMenu('services')} className={"sub-category-title"}>
                                    <ChevronLeft className={"absolute left-4 w-6 h-6 top-1/2 -translate-y-1/2"}/>
                                    Annonces & Services
                                </p>
                                <div className={"flex flex-col"}>
                                    {
                                        servicesCategories.map((service, key) => {
                                            return (
                                                <Link key={key} href={`/services/${service.name}`} className={"mobile-link link-hover"}>
                                                    {service.name}
                                                </Link>
                                            )
                                        })
                                    }
                                    <Link href={"/services"} className={"see-all"}>
                                        Voir tout
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li className={"mobile-link link-hover"}><Link href={"#"}>Charte du bon utilisateur</Link></li>
                        <li className={"mobile-link link-hover"}><Link href={"#"}>Nos conseils et astuces</Link></li>
                        <li className={"mobile-link link-hover"}>
                            <Link href={"/account/wishlist"} className={"flex flex-row items-center gap-x-2"}>
                                <Heart/>
                                Ma wishlist
                            </Link>
                        </li>
                        <li className={"mobile-link link-hover"}>
                            <Link href={"/items/add/product"} className={"flex flex-row items-center gap-x-2"}>
                                <Plus/>
                                Ajouter un produit
                            </Link>
                        </li>
                        <li className={"mobile-link link-hover"}>
                            <Link href={"/items/add/service"} className={"flex flex-row items-center gap-x-2"}>
                                <Plus/>
                                Ajouter un service/une annonce
                            </Link>
                        </li>
                        <li className={"mobile-link link-hover"}>
                            <Link href={"/account"} className={"flex flex-row items-center gap-x-2"}>
                                <User/>
                                Mon compte
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}