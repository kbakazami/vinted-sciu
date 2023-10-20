'use client';
import Image from "next/image";
import Button from "@/app/_components/button";
import {ChevronRight, Heart} from "@/app/_components/svg";

export default function Card(props) {

    const isProduct = props.isProduct;
    let detail = "24 articles"

    if(isProduct)
    {
        detail = "Taille / M / 38"
    }

    const addToWishlist = () => {
        console.log('Function addToWishlist console log');
    }

    return (
        <div className="relative">
            {/*<Image src={props.src} alt={props.title} className="w-full"/>*/}
            <div className={"w-full h-[350px] bg-gray-500 italic text-center text-2xl flex"}>
                <span className={"m-auto"}>
                    Placeholder pour la thumbnail du produit/catégorie
                </span>
            </div>
            {
                isProduct && !props.isUserProduct && <Button className="btn-round btn-secondary absolute right-2.5 top-2.5" onClick={addToWishlist}>
                    <Heart className="text-primary"/>
                </Button>
            }
            <div className={`absolute bottom-2.5 inset-x-2.5 flex flex-row items-center justify-between px-2.5 py-1.5 ${isProduct ? 'bg-primary-lighter' : ''}`}>
                <p className="flex flex-col">
                    <span>{props.title}</span>
                    <span className="text-secondary-darker"> { detail } </span>
                </p>
                <button className="btn btn-round btn-secondary card">
                    <ChevronRight className="text-primary w-3 h-3"/>
                </button>
            </div>

        </div>
    )
}