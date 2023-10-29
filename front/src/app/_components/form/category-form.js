"use client";
import * as React from "react";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addCategory, updateCategory, uploadImage} from "@/app/utils/categories";
import Image from "next/image";
import RouteToStaticFile, {readUploadedFile} from "@/app/utils/read-file";
import {ChevronRight} from "@/app/_components/svg";

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
            router.refresh();
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

        let form = null;
        const picture = data.image[0];

        if(data.image[0]) {
            form = new FormData();
            form.append("fileUpload", data.image[0]);
        }

        let pictureName = picture ? picture.name : null;

        const response = await addCategory(data.name, pictureName, form);

        if(response && response.status === 201)
        {
            showSuccessToast('Votre catégorie a bien été créée ! Vous serez redirigé dans un instant.');
            redirectToAdminCategory();
        } else {
            showErrorToast();
        }
    }

    const editCategory = async (data) => {

        let form = null;
        const picture = data.image[0];

        if(data.image[0]) {
            form = new FormData();
            form.append("fileUpload", data.image[0]);
        }

        let pictureName = picture ? picture.name : params.category.image;

        const response = await updateCategory(data.name, params.categoryId, pictureName, form);
        if(response && response.status === 204)
        {
            showSuccessToast('Votre catégorie a bien été mise à jour ! Vous serez redirigé dans un instant.');
            redirectToAdminCategory();
        } else {
            showErrorToast();
        }
    }

    const [preview, setPreview] = useState("");
    const [actualImage, setActualImage] = useState("");

    const loadPicture = async () => {
        const image = await readUploadedFile(params.category.image, '/media/categories');
        setActualImage(image);
    }

    useEffect(() => {

        if(params.category) {
            const fields = ['name'];

            fields.forEach(field => {
                setValue(field, params.category[field]);
            });

            if(params.category.image !== null) {
                loadPicture();
            }
        }
    }, [params.category]);

    const handleChange = (e) => {
        if(e.target.files.length) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <>
            <form className={`${params.isAdmin && 'admin'} form-wrapper mt-5`} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10 text-center"}>{params.titleForm}</h1>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"name"}>Nom de la catégorie</label>
                    <input type={"text"} placeholder={"Nom de la catégorie"} {...register("name", { required: true})}/>
                    {errors.name && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter le nom de la catégorie</p>}
                </div>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"name"}>Image de la catégorie</label>
                    <input type={"file"} placeholder={"Image de la catégorie"} {...register("image")} onChange={handleChange}/>
                    {params.category && params.category.image !== null &&
                        <p className={"italic text-red-500"}>ATTENTION : si vous ne voulez pas changer l'image, ne modifiez pas le champ ci-dessus ou l'image sera écrasée</p>
                    }
                    {errors.image && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter l'image de la catégorie</p>}
                </div>

                <div className={"flex flex-row gap-x-10 mt-4 items-center justify-between"}>
                    {params.category && actualImage && <div>
                        <p className={"font-bold italic"}>Image actuelle de la catégorie : </p>
                        <div className={"w-[300px] h-[350px] relative"}>
                            <Image src={`data:image/png;base64,${actualImage}`} alt="Image actuelle" fill={true} className={"object-cover"}/>
                        </div>
                    </div>
                    }
                    {preview && <div>
                        <p className={"font-bold italic"}>Nouvelle image :</p>
                        <div className={"w-[300px] h-[350px] relative"}>
                            <Image src={preview} alt="preview" fill={true} className={"object-cover"} />
                        </div>
                    </div>
                    }
                </div>

                <input className={`btn btn-secondary-darker cursor-pointer my-2 lg:my-10 w-fit mx-auto ${params.isAdmin && 'admin'}`} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}