"use client";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import {useRouter} from "next/navigation";
import {addCategory, getCategories, updateCategory} from "@/app/utils/categories";
import {useEffect, useState} from "react";
import {readUploadedFile} from "@/app/utils/read-file";
import Image from "next/image";

export default function UserForm(params) {
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    const router = useRouter();
    const [promos, setPromos] = useState([]);
    const [schools, setSchools] = useState([]);

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

    const redirectToAccount = () => {
        setTimeout(() => {
            router.refresh();
            router.push("/account");
        }, 5000);
    }

    const onSubmit = async (data) => {
        return params.category
            ? editUser(data)
            : createUser(data);
    }

    const createUser = async (data) => {

        let form = null;
        const picture = data.image[0];

        if(data.image[0]) {
            form = new FormData();
            form.append("fileUpload", data.image[0]);
        }

        let pictureName = picture ? picture.name : null;

        const response = await addUser(data.name, pictureName, form);

        if(response && response.status === 201)
        {
            showSuccessToast('Votre utilisateur a bien été créé ! Vous serez redirigé dans un instant.');
            redirectToAccount();
        } else {
            showErrorToast();
        }
    }

    const editUser = async (data) => {

        let form = null;
        const picture = data.image[0];

        if(data.image[0]) {
            form = new FormData();
            form.append("fileUpload", data.image[0]);
        }

        let pictureName = picture ? picture.name : params.user.picture;

        const response = await updateCategory(data.name, params.userId, pictureName, form);
        if(response && response.status === 204)
        {
            showSuccessToast('Les informations ont bien été mise à jour ! Vous serez redirigé dans un instant.');
            redirectToAccount();
        } else {
            showErrorToast();
        }
    }

    const [preview, setPreview] = useState("");
    const [actualImage, setActualImage] = useState("");

    const loadPicture = async () => {
        const image = await readUploadedFile(params.user.picture, '/media/users');
        setActualImage(image);
    }

    useEffect(() => {

        if(params.user) {
            const fields = ['lastName','firstName','email'];

            fields.forEach(field => {
                setValue(field, params.user[field]);
            });

            if(params.user.image !== null) {
                loadPicture();
            }
        }
    }, [params.user]);

    const handleChange = (e) => {
        if(e.target.files.length) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    const getPromosAndSchoolsList = async () => {
        const response = await getCategories();
        setCategories(response);
    }

    return (
        <>
            <form className={`${params.isAdmin && 'admin'} form-wrapper mt-5`} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10 text-center"}>{params.titleForm}</h1>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"lastName"}>Nom</label>
                    <input type={"text"} placeholder={"Nom"} {...register("lastName", { required: true})} disabled={true}/>
                    {errors.lastName && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter un nom</p>}
                </div>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"firstName"}>Nom</label>
                    <input type={"text"} placeholder={"Prénom"} {...register("firstName", { required: true})} disabled={true}/>
                    {errors.firstName && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter un prénom</p>}
                </div>

                <div className={`input-wrapper ${params.isAdmin && 'admin'}`}>
                    <label htmlFor={"email"}>Nom</label>
                    <input type={"text"} placeholder={"Email"} {...register("email", { required: true})} disabled={true}/>
                    {errors.email && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter un email</p>}
                </div>

                {/*<div className={`input-wrapper ${classAdmin}`}>*/}
                {/*    <label htmlFor={"promo"}>Promo</label>*/}
                {/*    <select className={"input-form"} defaultValue={""} {...register("promo", {required: true})}>*/}
                {/*        <option value={""} disabled>Promo</option>*/}
                {/*        {categories.map((category, key) => {*/}
                {/*            return (*/}
                {/*                <option key={key} value={category.id}>{category.name}</option>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </select>*/}
                {/*    {errors.category && <p className={"italic text-red-500 mb-4"}>Veuillez choisir une catégorie</p>}*/}
                {/*</div>*/}


                <input className={`btn btn-secondary-darker cursor-pointer my-2 lg:my-10 w-fit mx-auto ${params.isAdmin && 'admin'}`} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}