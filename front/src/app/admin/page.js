import Link from "next/link";

export default function AdminHome() {
    return (
        <div>
            <h1 className="text-center my-10">Bienvenue sur l'administration !</h1>
            <div>
                <h2 className="text-center">Des résumés ??</h2>
                <div className={"flex flex-row gap-x-4"}>
                    <Link href={"/admin/products"}>Produits</Link>
                    <Link href={"/admin/categories"}>Catégories</Link>
                    <Link href={"/admin/services-categories"}>Catégories des services</Link>
                    <Link href={"/admin/services"}>Services</Link>
                </div>
            </div>
        </div>
    )
}