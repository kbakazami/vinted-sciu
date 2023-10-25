"use client";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addCategory, updateCategory} from "@/app/utils/categories";

export default function CategoryForm(params) {

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
        toast.error('Une erreur est survenue. Veuillez réessayer dans un instant.', {
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

    const redirectToAdminCategory = () => {
        setTimeout(() => {
            router.push("/admin/categories");
        }, 5000);
    }

    const router = useRouter();

    const onSubmit = async (data) => {
        return params.category
            ? editCategory(data)
            : createCategory(data);
    }

    const createCategory = async (data) => {
        const response = await addCategory(data.name);
        if(response && response.status === 201)
        {
            showSuccessToast('Votre catégorie a bien été créée ! Vous serez redirigé dans un instant.');
            redirectToAdminCategory();
        } else {
            showErrorToast();
        }
    }

    const editCategory = async (data) => {
        const response = await updateCategory(data.name, params.categoryId);
        if(response && response.status === 204)
        {
            showSuccessToast('Votre catégorie a bien été mise à jour ! Vous serez redirigé dans un instant.');
            redirectToAdminCategory();
        } else {
            showErrorToast();
        }
    }

    useEffect(() => {
        if(params.category) {
            const fields = ['name'];
            fields.forEach(field => {
                setValue(field, params.category[field]);
            });
        }
    }, [params.category]);


    return (
        <>
            <form className={`${params.isAdmin && 'admin'} form-wrapper mt-5`} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10 text-center"}>{params.titleForm}</h1>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"name"}>Nom de la catégorie</label>
                    <input type={"text"} placeholder={"Nom de la catégorie"} {...register("name", { required: true})}/>
                    {errors.name && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter le nom de la catégorie</p>}
                </div>

                <input className={`btn btn-secondary-darker cursor-pointer my-2 lg:my-10 w-fit mx-auto ${params.isAdmin && 'admin'}`} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}