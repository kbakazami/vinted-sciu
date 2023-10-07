"use client";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getServicesCategories} from "@/app/utils/service-categories";
import {addService, updateService} from "@/app/utils/services";

export default function ServiceForm(params) {

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

    const redirectToAccount = () => {
        setTimeout(() => {
            router.push("/account/services");
        }, 5000);
    }

    const [servicesCategories, setServicesCategories] = useState([]);

    const router = useRouter();

    const getListServicesCategories = async () => {
        const response = await getServicesCategories();
        setServicesCategories(response);
    }

    useEffect(() => {
        getListServicesCategories();
    }, []);

    const onSubmit = async (data) => {
        return params.service
            ? editService(data)
            : createService(data);
    }

    const createService = async (data) => {
        const response = await addService(data.title, data.description, data.serviceCategory, 1);
        if(response && response.status === 201)
        {
            showSuccessToast('Votre service a bien été créé ! Vous serez redirigé dans un instant.');
            redirectToAccount();
        } else {
            showErrorToast();
        }
    }

    const editService = async (data) => {
        const response = await updateService(data.title, data.description, data.serviceCategory, 1, params.serviceId);
        if(response && response.status === 204)
        {
            showSuccessToast('Votre service a bien été mis à jour ! Vous serez redirigé dans un instant.');
            redirectToAccount();
        } else {
            showErrorToast();
        }
    }

    useEffect(() => {
        if(params.service) {
            const fields = ['title','description','serviceCategory'];
            fields.forEach(field => {
                if(field === 'serviceCategory')
                {
                    setValue(field, params.service[field].id);
                } else {
                    setValue(field, params.service[field]);
                }
            });
        }
    }, [params.service]);


    return (
        <>
            <form className={"form-wrapper mt-5"} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10"}>{params.titleForm}</h1>
                <input className={"input-form"} type={"text"} placeholder={"Nom du service"} {...register("title", { required: true})}/>
                {errors.product_name && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter le nom du service</p>}

                <textarea rows={8} className={"input-form"} placeholder={"Description du service"} {...register("description", {required: true})}/>
                {errors.description && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer une description</p>}

                <select className={"input-form"} defaultValue={""} {...register("serviceCategory", {required: true})}>
                    <option value={""} disabled>Catégorie</option>
                    {servicesCategories.map((category, key) => {
                        return (
                            <option key={key} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                {errors.category_id && <p className={"italic text-red-500 mb-4"}>Veuillez choisir une catégorie</p>}

                <input className={"btn btn-secondary-darker cursor-pointer my-2 lg:my-10"} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}