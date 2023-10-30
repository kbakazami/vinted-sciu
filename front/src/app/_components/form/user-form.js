"use client";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {readUploadedFile} from "@/app/utils/read-file";
import {getSchoolById, getSchools} from "@/app/utils/schools";
import {getPromoById, getPromos} from "@/app/utils/promos";
import {updateUser} from "@/app/utils/user";
import {useSession} from "next-auth/react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserForm(params) {
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    const router = useRouter();

    const [promos, setPromos] = useState([]);
    const [schools, setSchools] = useState([]);

    const { update } = useSession();

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
        return params.user
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

        const response = await updateUser(data.firstName, data.lastName, data.email, data.promo, data.ecole, params.user.id, pictureName, form);

        if(response.responseAxios && response.responseAxios.status === 204)
        {
            const promo = await getPromoById(data.promo);
            const school = await getSchoolById(data.ecole);

            await update({
                roles: params.user.roles,
                lastName: data.lastName,
                firstName: data.firstName,
                picture: response.userPicture,
                isActive: params.user.isActive,
                ecole: school,
                promo: promo
            });

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
            const fields = ['lastName','firstName','email','promo','ecole'];

            fields.forEach(field => {
                if(field === 'promo' && params.user['promo']) {
                    setValue(field, params.user[field].id);
                } else if(field === 'ecole' && params.user['ecole']) {
                    setValue(field, params.user[field].id);
                } else {
                    setValue(field, params.user[field]);
                }
            });

            if(params.user.picture !== null) {
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
        const schoolsList = await getSchools();
        setSchools(schoolsList);

        const promosList = await getPromos();
        setPromos(promosList);
    }

    useEffect(() => {
        getPromosAndSchoolsList();
    }, [])

    let classAdmin = '';
    let isDisabled = true;
    if(params.isAdmin)
    {
        classAdmin = 'admin';
        isDisabled = false;
    }

    return (
        <>
            <form className={`${classAdmin} form-wrapper mt-5`} onSubmit={handleSubmit(onSubmit)}>

                <h1 className={"title-bold my-2 lg:my-10 text-center"}>{params.titleForm}</h1>

                <div className={`input-wrapper ${classAdmin}`}>
                    <label htmlFor={"name"}>Image de profil</label>
                    <input type={"file"} placeholder={"Image de la catégorie"} {...register("image")} onChange={handleChange}/>
                    {params.user && params.user.picture !== null &&
                        <p className={"italic text-red-500"}>ATTENTION : si vous ne voulez pas changer l'image, ne modifiez pas le champ ci-dessus ou l'image sera écrasée</p>
                    }
                    {errors.image && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter l'image de l'utilisateur</p>}
                </div>

                <div className={"flex flex-row gap-x-10 items-center justify-between"}>
                    {params.user && actualImage && <div>
                        <p className={"font-bold italic"}>Image actuelle : </p>
                        <div className={"w-32 h-32 rounded-full relative"}>
                            <Image src={`data:image/png;base64,${actualImage}`} alt="Image actuelle" className={"object-cover w-full h-full rounded-full"} width={500} height={500}/>
                        </div>
                    </div>
                    }
                    {preview && <div>
                        <p className={"font-bold italic"}>Nouvelle image :</p>
                        <div className={"w-32 h-32 rounded-full relative"}>
                            <Image src={preview} alt="preview" className={"object-cover w-full h-full rounded-full"} width={500} height={500}/>
                        </div>
                    </div>
                    }
                </div>

                <div className={"flex flex-row gap-x-4"}>
                    <div className={`input-wrapper ${classAdmin}`}>
                        <label htmlFor={"lastName"}>Nom</label>
                        <input type={"text"} placeholder={"Nom"} {...register("lastName", { required: true})} disabled={isDisabled}/>
                        {errors.lastName && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter un nom</p>}
                    </div>

                    <div className={`input-wrapper ${classAdmin}`}>
                        <label htmlFor={"firstName"}>Prénom</label>
                        <input type={"text"} placeholder={"Prénom"} {...register("firstName", { required: true})} disabled={isDisabled}/>
                        {errors.firstName && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter un prénom</p>}
                    </div>
                </div>

                <div className={`input-wrapper ${classAdmin}`}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"text"} placeholder={"Email"} {...register("email", { required: true})} disabled={isDisabled}/>
                    {errors.email && <p className={"italic text-red-500 mb-4"}>Veuillez ajouter un email</p>}
                </div>

                <div className={"flex flex-row gap-x-4"}>
                    <div className={`input-wrapper ${classAdmin}`}>
                        <label htmlFor={"promo"}>Promo</label>
                        <select className={"input-form"} defaultValue={""} {...register("promo", {required: true})}>
                            <option value={""} disabled>Promo</option>
                            {promos.map((promo, key) => {
                                return (
                                    <option key={key} value={promo.id}>{promo.name}</option>
                                )
                            })}
                        </select>
                        {errors.promo && <p className={"italic text-red-500 mb-4"}>Veuillez choisir une promo</p>}
                    </div>

                    <div className={`input-wrapper ${classAdmin}`}>
                        <label htmlFor={"ecole"}>École</label>
                        <select className={"input-form"} defaultValue={""} {...register("ecole", {required: true})}>
                            <option value={""} disabled>École</option>
                            {schools.map((school, key) => {
                                return (
                                    <option key={key} value={school.id}>{school.name}</option>
                                )
                            })}
                        </select>
                        {errors.ecole && <p className={"italic text-red-500 mb-4"}>Veuillez choisir une école</p>}
                    </div>
                </div>

                <input className={`btn btn-secondary-darker cursor-pointer my-2 lg:my-10 w-fit mx-auto ${params.isAdmin && 'admin'}`} type={"submit"} value={`${params.submitText}`}/>
            </form>
            <ToastContainer className="toast-wrapper-custom"/>
        </>
    )
}