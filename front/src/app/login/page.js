"use client";

import * as React from "react";
import {signIn} from "next-auth/react"
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

export default function SignIn({ csrfToken }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {

        const response = await signIn("credentials", {email: data.email, password: data.password, redirect: false});

        if(response.ok) {
            router.push("/account");
        }
    }

    return (
        <>
            <form className={"w-1/3 bg-secondary flex flex-col p-4 gap-4 items-center mx-auto mt-10 mb-20"} onSubmit={handleSubmit(onSubmit)}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <h1 className={"title-bold my-5"}>Connexion</h1>
                <input className={"input-form"} type={"text"} placeholder={"example@myges.fr"} {...register("email", {required: true, pattern:/[a-z0-9]{2}(@myges\.fr)/})}/>
                {errors.email && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer un email qui respecte le format : example@myges.fr</p>}

                <input className={"input-form"} type={"password"} placeholder={"Mot de passe"} {...register("password", {required: true})} />
                {errors.password && <p className={"italic text-red-500 mb-4"}>Veuillez rentrer un mot de passe</p>}

                <input className={"btn btn-secondary-darker cursor-pointer"} type={"submit"} value={"se connecter"}/>
            </form>
        </>
    )
}