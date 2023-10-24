"use client";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addServiceCategory, getServicesCategories, updateServiceCategory} from "@/app/utils/service-categories";
import {addService, updateService} from "@/app/utils/services";

export default function ServiceCategoryForm(params) {

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

    const redirectToAdminServiceCategory = () => {
        setTimeout(() => {
            router.push("/admin/services-categories");
        }, 5000);
    }

    const router = useRouter();

    const onSubmit = async (data) => {
        return params.serviceCategory
            ? editServiceCategory(data)
            : createServiceCategory(data);
    }

    const createServiceCategory = async (data) => {
        const response = await addServiceCategory(data.name);
        if(response && response.status === 201)
        {
            showSuccessToast('Votre catégorie pour les services a bien été créée ! Vous serez redirigé dans un instant.');
            redirectToAdminServiceCategory();
        } else {
            showErrorToast();
        }
    }

    const editServiceCategory = async (data) => {
        const response = await updateServiceCategory(data.name, params.serviceCategoryId);
        if(response && response.status === 200)
        {
            showSuccessToast('Votre catégorie pour les services a bien été mise à jour ! Vous serez redirigé dans un instant.');
            redirectToAdminServiceCategory();
        } else {
            showErrorToast();
        }
    }

    useEffect(() => {
        if(params.serviceCategory) {
            const fields = ['name'];
            fields.forEach(field => {
                setValue(field, params.serviceCategory[field]);
            });
        }
    }, [params.serviceCategory]);


    return (
        <>
            <form className={`${params.isAdmin && 'admin'} form-wrapper mt-5`} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10 text-center"}>{params.titleForm}</h1>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"name"}>Nom de la catégorie pour les services</label>
                    <input type={"text"} placeholder={"Nom de la catégorie pour les services"} {...register("name", { required: true})}/>
                    {errors.name && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter le nom de la catégorie pour les services</p>}
                </div>

                <input className={`btn btn-secondary-darker cursor-pointer my-2 lg:my-10 w-fit mx-auto ${params.isAdmin && 'admin'}`} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}