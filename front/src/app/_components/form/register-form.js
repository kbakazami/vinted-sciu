"use client";

import * as React from "react";
import {signIn, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import { useForm } from 'react-hook-form';
import {register as customRegister} from "@/app/utils/auth";

export default function RegisterForm() {

    const { status } = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const router = useRouter();

    useEffect(() => {
        if(status === "authenticated")
        {
            router.push("/account");
        }
    },[status, router]);

    const onSubmit = async (data) => {
        const response = await customRegister(data.first_name, data.last_name, data.email, data.password);
        if(response) {
            await signIn("credentials", {email: data.email, password: data.password, callbackUrl: '/account'});
        }
    };

    return (
        <>
            <form className={"form-wrapper mt-5"} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={"title-bold my-5"}>Inscription</h1>

                <input className={"input-form"} type={"first_name"} placeholder={"Prénom"} {...register("first_name", {required: true})} />
                {errors.password && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer un prénom</p>}

                <input className={"input-form"} type={"last_name"} placeholder={"Nom"} {...register("last_name", {required: true})} />
                {errors.password && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer un nom</p>}

                <input className={"input-form"} type={"text"} placeholder={"example@myges.fr"} {...register("email", { required: true, pattern:/[a-z0-9]{2}(@myges\.fr)/})}/>
                {errors.email && <p className={"italic text-red-500 mb-4"}>L'email ne correspond pas. Veuillez utiliser l'email que l'école vous as fournie</p>}

                <input className={"input-form"} type={"password"} placeholder={"Mot de passe"} {...register("password", {required: true})} />
                {errors.password && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer un mot de passe</p>}

                <input className={"btn btn-secondary-darker cursor-pointer"} type={"submit"} value={"s'inscrire"}/>
            </form>
        </>

    )
}