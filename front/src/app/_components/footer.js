import Image from "next/image";
import logoRucheCitoyenne from "./logos/Logo_Ruche_Citoyenne.png";
import EDBS from "./logos/EDBS_Logo.png";
import EIML from "./logos/EIML_Master_logo.png";
import ESC from "./logos/ESC_logo_web.png";
import ESGI from "./logos/ESGI_logo.png";
import ICAN from "./logos/ICAN_Master_Logo_Print.png";
import EFAB from "./logos/Logo_EFAB_Classique PNG.png";
import ENGDE from "./logos/Logo_ENGDE_master_logo.png";
import ESUPCOM from "./logos/Logo_Esupcom_Classique.png";
import ISFJ from "./logos/logo_ISFJ_Master_Logo.png";
import SU from "./logos/Logo_SU.png";
import MAESTRIS from "./logos/maestris_BTS.png";
import MODART from "./logos/MODART_Master_Logo.png";
import PPA from "./logos/PPA_Master_Logo.png";
import PPASPORT from "./logos/PPA_Sport_Master_Logo_PNG.png";
import WellnessCenter from "./logos/Logo_Wellness_Center.png";

import {Facebook, Instagram, Linkedin, Twitter} from "@/app/_components/svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={"bg-secondary px-4 lg:px-0 lg:py-10"}>
            <div className={"max-w-screen-xl mx-auto flex flex-col lg:flex-row"}>
                <div className={"section-footer text-center items-center"}>
                    <Image src={logoRucheCitoyenne} alt={"La ruche citoyenne"} className={"w-40 h-40"}/>
                    <a href={"tel:04 26 29 01 01"}>04 26 29 01 01</a>
                    <p>53 Cours Albert Thomas 69003 Lyon</p>
                    <div className={"flex flex-row gap-x-4 mt-5"}>
                        <Link href={"https://www.facebook.com/CSULyon"} className={"social-link-footer"} target={"_blank"}>
                            <Facebook className={"social-icon"}/>
                        </Link>
                        <Link href={"https://www.instagram.com/campus_sciencesu_lyon"} className={"social-link-footer"} target={"_blank"}>
                            <Instagram className={"social-icon"}/>
                        </Link>
                        <Link href={"https://www.twitter.com/csulyon"} className={"social-link-footer"} target={"_blank"}>
                            <Twitter className={"social-icon"}/>
                        </Link>
                        <Link href={"https://linkedin.com/in/school/5395625/"} className={"social-link-footer"} target={"_blank"}>
                            <Linkedin className={"social-icon"}/>
                        </Link>
                    </div>
                </div>

                <div className={"section-footer gap-y-5 items-start"}>
                    <h4>Informations</h4>
                    <Link href={"/account"}>Mon compte</Link>
                    <Link href={"/login"}>Connexion</Link>
                    <Link href={"/account/wishlist"}>Wishlist</Link>
                </div>

                <div className={"section-footer gap-y-5 items-start"}>
                    <h4>Services</h4>
                    <Link href={"#"}>A propos de nous</Link>
                    <Link href={"https://www.myges.fr/#/"} target={"_blank"}>Myges</Link>
                    <Link href={"#"}>Termes et conditions</Link>
                    <Link href={"https://www.sciences-u-lyon.fr/"} target={"_blank"}>Sciences U Lyon</Link>
                </div>

                <div className={"p-5 lg:px-10 lg:w-5/12"}>
                    <div className={"grid grid-cols-4 items-center gap-2.5 mb-4"}>
                        <Image src={SU} alt={"Sciences U Lyon"}/>
                        <Image src={ESUPCOM} alt={"Esup Com' La grande école de communication"}/>
                        <Image src={ENGDE} alt={"Gestion finance expertise comptable"}/>
                        <Image src={WellnessCenter} alt={"Wellness Center"}/>
                        <Image src={MAESTRIS} alt={"Maestris BTS"}/>
                        <Image src={MODART} alt={"Modart International"}/>
                        <Image src={PPA} alt={"Business school Pôle Paris Alternance"}/>
                        <Image src={PPASPORT} alt={"Sport Business school"}/>
                        <Image src={ISFJ} alt={"Institut Supérieur de Formation au Journalisme"}/>
                        <Image src={EDBS} alt={"Entrepreneuriat Digital & Business School"}/>
                        <Image src={ICAN} alt={"Institut de Création et Animation Numériques"}/>
                        <Image src={ESGI} alt={"École supérieure de génie informatique"}/>
                        <Image src={EFAB} alt={"Efab"}/>
                        <Image src={EIML} alt={"École internationale de marketing du luxe"}/>
                        <Image src={ESC} alt={"Effet studio créa"}/>
                    </div>
                    <p>Site développé par deux étudiants de l'ESGI à Lyon</p>
                </div>

            </div>
        </footer>
    )
}