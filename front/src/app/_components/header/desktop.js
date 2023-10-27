'use client';
import rucheCitoyenne from '../logos/Logo_Ruche_Citoyenne.png';
import wellnessCenter from '../logos/Logo_Wellness_Center.png';
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_components/button";
import {Heart, Menu, Plus, Search} from "@/app/_components/svg";
import UserAuthenticated from "@/app/_components/navigation/user-authenticated";
import UserAddItems from "@/app/_components/navigation/user-add-items";
import {useEffect, useRef, useState} from "react";
import useOutsideClick from "@/app/_components/use-outside-click";
import {getCategories} from "@/app/utils/categories";
import {getServicesCategories} from "@/app/utils/service-categories";

export default function HeaderDesktop() {

    const [showUserMenu, setShowUserMenu] = useState(false);
    const refUserMenu = useRef();

    const [showAddItemMenu, setShowAddItemMenu] = useState(false);
    const refAddItemMenu = useRef();

    const [categories, setCategories] = useState([]);
    const [servicesCategories, setServicesCategories] = useState([]);

    const [isDropdownSubCategoryVisible, setIsDropdownSubCategoryVisible] = useState(false);
    const [isDropdownSubServiceVisible, setIsDropdownSubServiceVisible] = useState(false);

    const getCategoriesAndServicesList = async () => {
        const categoriesList = await getCategories();
        setCategories(categoriesList);

        const servicesCategoriesList = await getServicesCategories();
        setServicesCategories(servicesCategoriesList);
    }

    useEffect(() => {
        getCategoriesAndServicesList();
    }, []);

    useOutsideClick(refUserMenu, () => {
        if (showUserMenu) {
            setShowUserMenu(false);
        }
    });

    useOutsideClick(refAddItemMenu, () => {
        if (showAddItemMenu) {
            setShowAddItemMenu(false);
        }
    });

    const subCategoriesWrapper = document.querySelector('.sub-categories-wrapper');

    function showSubMenu(type) {
        if(type === 'categories')
        {
            subCategoriesWrapper.classList.remove('hidden');
            subCategoriesWrapper.classList.add('flex');
        }
    }

    function hideSubMenu(type) {
        if(type === 'categories')
        {
            subCategoriesWrapper.classList.add('hidden');
            subCategoriesWrapper.classList.remove('flex');
        }
    }

    return (
        <header className={"hidden lg:block"}>
            <nav className="flex flex-row w-full items-center h-20 custom-container justify-between">
                <div className={"flex flex-row items-center lg:min-w-[190px]"}>
                    <Link href={"/"} className={"w-[120px] xl:w-[160px]"}>
                        <Image className={"w-auto h-20 xl:h-24"} src={rucheCitoyenne} alt={"Logo la ruche citoyenne"}/>
                    </Link>
                    <Image className={"w-[120px] xl:w-[160px]"} src={wellnessCenter} alt={"Logo Wellness Center"}/>
                </div>
                <div className={"flex flex-row justify-between w-full"}>
                    <ul className={"flex flex-row flex-wrap gap-x-4 xl:gap-x-8 items-center text-sm xl:text-base mx-auto relative"}>
                        <li onMouseEnter={() => setIsDropdownSubCategoryVisible(true)} onMouseLeave={() => setIsDropdownSubCategoryVisible(false)}>
                            <Link href={"/catalog"} className={"link-hover"}>
                                Catalogue
                            </Link>
                            {isDropdownSubCategoryVisible &&
                                <div className={"pt-8 pb-4 bg-white absolute shadow-xl sub-categories-wrapper w-full z-20 left-0"}>
                                    <ul className={"grid grid-cols-4"}>
                                        {
                                            categories.map((category, key) => {
                                                return (
                                                    <li key={key} className={"py-2 px-5 link-hover"}><Link href={`/catalog/${category.name}`}>{category.name}</Link></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                        </li>
                        <li onMouseEnter={() => setIsDropdownSubServiceVisible(true)} onMouseLeave={() => setIsDropdownSubServiceVisible(false)}>
                            <Link href={"/services"} className={"link-hover"}>
                                Annonces & Services
                            </Link>
                            {isDropdownSubServiceVisible &&
                                <div className={"pt-8 pb-4 bg-white absolute shadow-xl sub-categories-wrapper w-full z-20 left-0"}>
                                    <ul className={"grid grid-cols-4"}>
                                        {
                                            servicesCategories.map((service, key) => {
                                                return (
                                                    <li key={key} className={"py-2 px-5 link-hover"}><Link href={`/services/${service.name}`}>{service.name}</Link></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                        </li>
                        <li><Link href={"#"} className={"link-hover"}>Charte du bon utilisateur</Link></li>
                        <li><Link href={"#"} className={"link-hover"}>Nos conseils et astuces</Link></li>
                    </ul>
                    <ul className={"flex flex-row gap-x-2 xl:gap-x-5 items-center"}>
                        <li>
                            <Button href="#" content="" className="btn-round btn-secondary nav">
                                <Search className="text-primary svg-btn-nav"/>
                            </Button>
                        </li>
                        <li className="relative">
                            <Button href="" onClick={() => setShowAddItemMenu(!showAddItemMenu)} content="" className="btn-round btn-secondary nav">
                                <Plus className="text-primary svg-btn-nav"/>
                            </Button>
                            {showAddItemMenu && (
                                <div ref={refAddItemMenu}>
                                    <UserAddItems/>
                                </div>
                            )}
                        </li>
                        <li>
                            <Button href="/account/wishlist" content="" className="btn-round btn-secondary nav">
                                <Heart className="text-primary svg-btn-nav"/>
                            </Button>
                        </li>
                        <li className="relative">
                            <Button href={""} onClick={() => setShowUserMenu(!showUserMenu)} content="" className="btn-round btn-secondary nav">
                                <Menu className="text-secondary-darker svg-btn-nav"/>
                            </Button>
                            {showUserMenu && (
                                <div ref={refUserMenu}>
                                    <UserAuthenticated/>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}