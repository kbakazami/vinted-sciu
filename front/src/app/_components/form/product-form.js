"use client";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {getCategories} from "@/app/utils/categories";
import {addProduct} from "@/app/utils/products";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [categories, setCategories] = useState([]);

    const router = useRouter();

    const getListCategories = async () => {
        const response = await getCategories();
        setCategories(response);
    }

    useEffect(() => {
        getListCategories();
    }, []);


    const onSubmit = async (data) => {
        const response = await addProduct(data.product_name, data.description, data.category_id, 1);
        if(response && response.status === 201)
        {
            toast.success('Votre produit a bien été créé ! Vous serez redirigé dans un instant.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setTimeout(() => {
                router.push("/account/products");
            }, 5000);
        } else {
            toast.error('Une erreur est survenue. Veuillez réessayer dans un instant. Si le problème persiste, contactez Laurie BEAUJOUEN', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <form className={"form-wrapper mt-5"} onSubmit={handleSubmit(onSubmit)}>

                <input className={"input-form"} type={"text"} placeholder={"Nom de l'article"} {...register("product_name", { required: true})}/>
                {errors.product_name && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter le nom de l'article</p>}

                <textarea className={"input-form"} placeholder={"Description de l'article"} {...register("description", {required: true})} />
                {errors.description && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer une description</p>}

                <select className={"input-form"} defaultValue={""} {...register("category_id", {required: true})}>
                    <option value={""} disabled>Catégorie</option>
                    {categories.map((category, key) => {
                        return (
                            <option key={key} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                {errors.category_id && <p className={"italic text-red-500 mb-4"}>Veuillez choisir une catégorie</p>}

                <input className={"btn btn-secondary-darker cursor-pointer"} type={"submit"} value={"Ajouter le produit"}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}