"use client";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {getCategories} from "@/app/utils/categories";
import {addProduct, updateProduct} from "@/app/utils/products";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductForm(params) {

    const { register, handleSubmit,setValue, formState: { errors } } = useForm();

    const showSuccessToast = (message) => {
        toast.success(message, {
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

    const showErrorToast = () => {
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

    const redirectToPage = () => {
        setTimeout(() => {
            if(params.isAdmin) {
                router.push("/admin/products");
            } else {
                router.push("/account/products");
            }
        }, 5000);
    }

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
        return params.product
            ? editProduct(data)
            : createProduct(data);
    }

    const createProduct = async (data) => {
        const response = await addProduct(data.title, data.description, data.category, 1);
        if(response && response.status === 201)
        {
            showSuccessToast('Votre produit a bien été créé ! Vous serez redirigé dans un instant.');
            redirectToPage();
        } else {
            showErrorToast();
        }
    }

    const editProduct = async (data) => {
        const response = await updateProduct(data.title, data.description, data.category, 1, params.productId);
        if(response && response.status === 204)
        {
            showSuccessToast('Votre produit a bien été mis à jour ! Vous serez redirigé dans un instant.');
            redirectToPage();
        } else {
            showErrorToast();
        }
    }

    useEffect(() => {
        if(params.product) {
            const fields = ['title','description','category'];
            fields.forEach(field => {
                if(field === 'category')
                {
                    setValue(field, params.product[field].id);
                } else {
                    setValue(field, params.product[field]);
                }
            });
        }
    }, [params.product]);

    let classAdmin = '';
    if(params.isAdmin)
    {
        classAdmin = 'admin';
    }

    return (
        <>
            <form className={`form-wrapper mt-5 mb-10 ${classAdmin}`} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10 text-center"}>{params.titleForm}</h1>

                <div className={`input-wrapper ${classAdmin}`}>
                    <label htmlFor={"title"}>Nom du produit</label>
                    <input className={"input-form"} type={"text"} placeholder={"Nom de l'article"} {...register("title", { required: true})}/>
                    {errors.title && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter le nom de l'article</p>}
                </div>

                <div className={`input-wrapper ${classAdmin}`}>
                    <label htmlFor={"title"}>Description de l'article</label>
                    <textarea className={"input-form"} rows={8} placeholder={"Description de l'article"} {...register("description", {required: true})}/>
                    {errors.description && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer une description</p>}
                </div>

                <div className={`input-wrapper ${classAdmin}`}>
                    <label htmlFor={"title"}>Catégorie de l'article</label>
                    <select className={"input-form"} defaultValue={""} {...register("category", {required: true})}>
                        <option value={""} disabled>Catégorie</option>
                        {categories.map((category, key) => {
                            return (
                                <option key={key} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                    {errors.category && <p className={"italic text-red-500 mb-4"}>Veuillez choisir une catégorie</p>}
                </div>

                <input className={`btn btn-secondary-darker cursor-pointer my-2 lg:my-10 w-fit mx-auto ${classAdmin}`} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}