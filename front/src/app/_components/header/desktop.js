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

export default function HeaderDesktop() {

    const [showUserMenu, setShowUserMenu] = useState(false);
    const refUserMenu = useRef();

    const [showAddItemMenu, setShowAddItemMenu] = useState(false);
    const refAddItemMenu = useRef();

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
                    <ul className={"flex flex-row flex-wrap gap-x-4 xl:gap-x-8 items-center text-sm xl:text-base mx-auto"}>
                        <li><Link href={"#"}>Catalogue</Link></li>
                        <li><Link href={"#"}>Annonces & Services</Link></li>
                        <li><Link href={"#"}>Charte du bon utilisateur</Link></li>
                        <li><Link href={"#"}>Nos conseils et astuces</Link></li>
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