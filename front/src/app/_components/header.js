'use client';
import rucheCitoyenne from './logos/Logo_Ruche_Citoyenne.png';
import wellnessCenter from './logos/Logo_Wellness_Center.png';
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_components/button";
import {Heart, Menu, Search, User} from "@/app/_components/svg";
import UserAuthenticated from "@/app/_components/navigation/user-authenticated";

export default function Header() {
    const displayUserMenu = () => {
        document.querySelector('.menu-wrapper').classList.toggle('hidden');
    }

    const displayMenuMobile = () => {
        document.querySelector('.nav-wrapper').classList.toggle('hidden');
        document.querySelector('.nav-wrapper').classList.toggle('open');
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.classList.toggle('open');
        })
        document.querySelector('body').classList.toggle('overflow-y-hidden');
    }

    return (
        <header>
            <nav className="flex flex-row w-full items-center h-20 custom-container justify-between">
                <Button href={""} onClick={displayMenuMobile} content="" className="btn-round btn-secondary nav lg:hidden nav">
                    <Menu className="text-secondary-darker"/>
                </Button>

                <div className={"flex flex-row items-center lg:min-w-[190px]"}>
                    <Link href={"/"} className={"w-[160px]"}>
                        <Image className={"w-auto h-24"} src={rucheCitoyenne} alt={"Logo la ruche citoyenne"}/>
                    </Link>
                    <Image className={"hidden lg:block w-[160px]"} src={wellnessCenter} alt={"Logo Wellness Center"}/>
                </div>
                <div className={"lg:flex lg:flex-row nav-wrapper hidden lg:justify-between lg:w-full"}>
                    <ul className={"flex flex-col lg:flex-row flex-wrap gap-x-4 xl:gap-x-8 lg:items-center text-base lg:mx-auto"}>
                        <li className={"mobile-link"}><Link href={"#"}>Mode</Link></li>
                        <li className={"mobile-link"}><Link href={"#"}>Maison</Link></li>
                        <li className={"mobile-link"}><Link href={"#"}>Forum</Link></li>
                        <li className={"mobile-link"}><Link href={"#"}>Charte du bon utilisateur</Link></li>
                        <li className={"mobile-link"}><Link href={"#"}>Nos conseils et astuces</Link></li>
                    </ul>
                    <ul className={"flex flex-col lg:flex-row gap-x-5 lg:items-center"}>
                        <li className={"mobile-link"}>
                            <Button href="#" content="" className="mobile-open lg:btn-round lg:btn-secondary lg:nav">
                                <Search className="text-primary"/>
                                <span className={"lg:hidden"}>Recherche</span>
                            </Button>
                        </li>
                        <li className={"mobile-link border-none"}>
                            <Button href="#" content="" className="mobile-open lg:btn-round lg:btn-secondary lg:nav">
                                <Heart className="text-primary"/>
                                <span className={"lg:hidden"}>Liste de souhait</span>
                            </Button>
                        </li>
                        <li className="relative hidden lg:block">
                            <Button href={""} onClick={displayUserMenu} content="" className="btn-round btn-secondary nav">
                                <Menu className="text-secondary-darker"/>
                            </Button>
                            <UserAuthenticated/>
                        </li>
                    </ul>
                </div>
                <Button href={""} onClick={displayUserMenu} content="" className="btn-round btn-secondary nav lg:hidden">
                    <User className="text-primary"/>
                </Button>
            </nav>
        </header>
    )
}