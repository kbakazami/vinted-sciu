import {getProductById} from "@/app/utils/products";
import ProductPicturesSlider from "@/app/_components/product/product-pictures-slider";
import {getUserById} from "@/app/utils/user";
import Image from "next/image";
import Button from "@/app/_components/button";
import {Bookmark, Bubble, Heart, User} from "@/app/_components/svg";

const ProductsPage = async ({ params }) => {

    const product = await getProductById(params.id);
    const user = await getUserById(params.id);

    console.log(user);

    return (
        <div className={"max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:gap-x-4 xl:gap-x-9 mt-10 lg:px-4"}>
            <ProductPicturesSlider pictures={product.images} name={product.title}/>
            <div className={"flex flex-col px-4 w-full lg:w-1/2 lg:px-0"}>
                <h1 className={"text-center title-bold mt-5 lg:text-left lg:mt-0"}>{product.title}</h1>
                <p className={"bg-secondary p-5 my-5"}>
                    {product.description}
                </p>
                <ul className={"flex flex-col gap-y-2.5"}>
                    <li className={"flex flex-row gap-x-5"}>
                        <p className={"font-bold w-1/4"}>Taille</p>
                        <p>M/38</p>
                    </li>
                    <li className={"flex flex-row gap-x-5"}>
                        <p className={"font-bold w-1/4"}>État</p>
                        <p>Bon état</p>
                    </li>
                    <li className={"flex flex-row gap-x-5"}>
                        <p className={"font-bold w-1/4"}>Matière</p>
                        <p>Coton</p>
                    </li>
                    <li className={"flex flex-row gap-x-5"}>
                        <p className={"font-bold w-1/4"}>Couleur</p>
                        <p>Noir</p>
                    </li>
                </ul>

                <div className={"flex flex-col sm:flex-row gap-3 xl:gap-x-14 mb-3 mt-5"}>
                    <Button href="#" content="Ajouter aux favoris" className="btn-secondary-darker product">
                        <Heart className={"text-white"}/>
                    </Button>
                    <Button href="#" content="Contacter" className="btn-secondary-darker product">
                        <Bubble className={"text-white"}/>
                    </Button>
                </div>
                <Button href="#" content="Réserver" className="btn-secondary-darker product product full">
                    <Bookmark className={"text-white"}/>
                </Button>

                <div className={"flex flex-row gap-x-1.5 mt-10 lg:mt-auto"}>
                    <Image src={user.image} alt={user.firstname} height={90} width={90} loading={"lazy"} className={"object-cover w-22 h-22 border border-red-500"}/>
                    <div className={"flex flex-col justify-between"}>
                        <p className={"font-bold"}>{user.firstName} {user.lastName}</p>
                        <p>{user.company.address.address}</p>
                        <Button href="#" content="Voir le profil" className="small"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;