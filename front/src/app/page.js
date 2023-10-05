'use client';
import Image from 'next/image';
import Button from "@/app/_components/button";
import Info from "@/app/_components/info";
import introduction from './introduction.jpg';
import {Bubble, ChevronDown, List, User} from "@/app/_components/svg";
import Card from "@/app/_components/card";
import CatePull from './cate-pull.png';
import ProductPull from './product-pull.png';
import Annonces from './annonces.jpg';

export default function Home() {

    const displayRules = () => {
        document.querySelector('.rules-wrapper').classList.toggle('hidden');
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="container 3xl:max-w-full">
                <div className="flex flex-col-reverse lg:flex-row">
                    <div className="flex flex-col max-w-[1200px] w-full lg:w-1/2 bg-secondary p-4 lg:px-11 3xl:px-32 justify-center text-left">
                        <h1 className="uppercase flex flex-col lg:mb-5 mx-auto">
                            <span>Bienvenue sur</span>
                            <span className="font-bold ml-16 lg:ml-28 lg:mt-2">secondchance</span>
                        </h1>
                        <p className="mt-3">
                            Sciences-U par le biais du Wellness-Center s’attache au bien-être de l’étudiant en dehors des temps de formation au sein du campus. Les temps d’échanges avec les étudiants pendant l’année ont mis en avant les difficultés pour certains étudiants de se nourrir et de se vêtir (notamment).
                        </p>
                        <p className="mt-5">
                            De là, plusieurs pistes de travail/réflexion ont vu le jour et notamment le frigo solidaire et la braderie du mois de mars.
                        </p>
                        <p className="mt-5">
                            Face à la réussite de cette dernière, nous avons décidé de mettre en place un projet pérenne et durable pour vous permettre d’accéder facilement et durant toute l’année à des ressources pour vous faciliter votre quotidien.
                        </p>
                        <p className="mt-5">
                            Ce projet a pour ambition d’opérer la mise en relation des donneurs au sein du campus avec des étudiants qui ont des besoins. Le projet a également une portée RSE puisque qu’il participe à faire vivre une deuxième vie aux dons sur la plateforme et permettra la revalorisation d’objets en tout genre. Il permet également de nouer des liens de solidarité entre les personnes donneuses et les personnes recevant pour valoriser le vivre ensemble.
                        </p>
                        <Button href="#" content="Commencer à explorer" className="mt-5"/>
                    </div>
                    <Image className={"homepage-picture"} src={introduction} alt="Dressing"/>
                </div>
                <div className="custom-container mb-10 lg:mb-20">
                    <Info title={"Comment ça fonctionne ?"} className="mt-5 lg:mt-12">
                        <p>Pas besoin de créer de compte ! Vous pouvez vous connecter directement avec vos identifiants MYGES !
                            <br/>Une fois connecté vous pourrez voir, réserver et récupérer votre bien !
                        </p>
                        <Button href="#" content="Se connecter" className="mt-5">
                            <User className="text-white"/>
                        </Button>
                    </Info>

                    <Info title={"Forum des besoins"} className="mt-5 lg:mt-12">
                        <p>Espace de paroles pour communiquer sur vos besoins spécifiques en faisant appel au don et les publier.</p>
                        <Button href="#" content="Publier votre annonce" className="mt-5">
                            <Bubble className="text-white"/>
                        </Button>
                    </Info>

                    <Info title={"Charte du bon utilisateur"} className="mt-5 lg:mt-12">
                        <p>Cette plateforme est simple d’utilisation.
                            <br/>
                            Vous trouverez ci-dessous les 10 commandements du bon utilisateur de cette plateforme.
                        </p>
                        <Button href="#" content="Les 10 commandements" className="mt-5" onClick={displayRules}>
                            <List className="text-white"/>
                        </Button>
                        <ul className="text-left mt-5 rules-wrapper hidden">
                            <li>1/ Il n’est pas possible d’acheter en ligne. Il s’agit seulement d’une plateforme de réservation en ligne.</li>
                            <li>2/ Le premier qui réserve est prioritaire. En cas de rétractation du donneur, l’étudiant ne pourra pas demander une compensation. Le don est libre et ne doit pas être contraint d’une quelconque façon pour le donneur.</li>
                            <li>3/ Interdiction de faire de la revente des produits réservés.</li>
                            <li>4/ Si le produit réservé ne convient pas (taille, couleurs, forme…etc), merci de le remettre à la personne qui a fait la donation pour qu’elle puisse le remettre en ligne et en faire bénéficier quelqu’un d’autre.</li>
                            <li>5/ Pas plus de 2 réservations étudiants par jour.</li>
                            <li>6/ Accès à la plateforme via vos identifiants MYGES. Accès uniquement aux étudiants du campus.</li>
                            <li>7/ Le personnel de l’établissement accèdent aussi à la plateforme mais avec un quota de réservation. 1 objet déposé donne le droit à une réservation.</li>
                            <li>8/ Il est possible pour les étudiants de déposer des annonces de dons.</li>
                            <li>9/ Il est possible dans la section « Vos besoins » d’indiquer des demandes spécifiques auprès de la communauté et de faire un appel au don.</li>
                            <li>10/ Soyez responsable. Prenez seulement ce dont vous avez besoin mais ne réservez pas tout.</li>
                        </ul>
                        <p className="font-bold mt-5">Commencez par découvrir les différentes catégories disponibles ainsi que les dernières nouveautés ci dessous !</p>
                    </Info>
                    <span className="btn btn-round btn-primary mt-9">
                    <ChevronDown className="text-primary"/>
                </span>

                    <div className="mt-9">
                        <h2>Quelques catégories</h2>
                        <div className={"grid-product-categories-wrapper"}>
                            <Card src={CatePull}/>
                            <Card src={CatePull}/>
                            <Card src={CatePull}/>
                            <Card src={CatePull}/>
                        </div>

                        <h2>Les dernières nouveautés</h2>
                        <div className={"grid-product-categories-wrapper"}>
                            <Card src={ProductPull} isProduct={true}/>
                            <Card src={ProductPull} isProduct={true}/>
                            <Card src={ProductPull} isProduct={true}/>
                            <Card src={ProductPull} isProduct={true}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row">
                    <Image className={"homepage-picture"} src={Annonces} alt="Annonces"/>
                    <div className="flex flex-col w-full lg:w-1/2 max-w-[1200px] p-4 bg-secondary lg:px-11 3xl:px-32 justify-center text-left">
                        <span className="uppercase flex flex-col lg:mb-5 mx-auto title">
                            <span>Faire le tour</span>
                            <span className="font-bold ml-12 lg:ml-28 mt-1 lg:mt-2">des annonces</span>
                        </span>
                        <p className="mt-3 lg:mt-5">
                            Parce que vos besoins ne s’arrêtent pas seulement à des vêtements, vous trouverez dans la rubrique <strong>Maison</strong> des articles pour vous aider à décorer votre logement ou à vous équiper (petit électroménager, ameublement, art de la table, linge de maison, objets divers…).
                            Si vous avez un besoin spécifique, n’hésitez pas à utiliser la rubrique <strong>Forum</strong> pour le mentionner.
                        </p>
                        <Button href="#" content="Commencer à explorer" className="mt-5"/>
                    </div>
                </div>
                <div className={"custom-container mt-10 lg:mt-16"}>
                    <h2>Quelques catégories</h2>
                    <div className={"grid-product-categories-wrapper"}>
                        <Card src={CatePull}/>
                        <Card src={CatePull}/>
                        <Card src={CatePull}/>
                        <Card src={CatePull}/>
                    </div>

                    <h2>Les dernières nouveautés</h2>
                    <div className={"grid-product-categories-wrapper"}>
                        <Card src={ProductPull} isProduct={true}/>
                        <Card src={ProductPull} isProduct={true}/>
                        <Card src={ProductPull} isProduct={true}/>
                        <Card src={ProductPull} isProduct={true}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
