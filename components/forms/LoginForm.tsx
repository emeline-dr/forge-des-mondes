'use client'

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import axios from "axios"
import Cookies from 'js-cookie';

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(', ')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export function LoginForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            setErrorMessage(null);

            try {
                const response = await axios.post(
                    "https://forgedesmondes-back.onrender.com/users/login",
                    {
                        email: value.email,
                        password: value.password
                    },
                    {
                        withCredentials: true,
                    }
                );

                const data = response.data;

                if (data.token) {
                    const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
                    Cookies.set('authToken', data.jwt, {
                        expires: oneHourFromNow, path: '/',
                        secure: true
                    })
                }

                window.location.href = "/dashboard";
            } catch (err: unknown) {
                if (axios.isAxiosError(err) && err.response) {
                    setErrorMessage(err.response.data?.message || "Erreur de connexion");
                } else if (err instanceof Error) {
                    setErrorMessage(err.message);
                } else {
                    setErrorMessage("Une erreur inconnue s'est produite");
                }
            }
        }
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>
            <div>
                {/* Email */}
                <form.Field
                    name="email"
                >
                    {(field) => (
                        <>
                            <label htmlFor={field.name}>Adresse mail</label><br />
                            <input
                                type="email"
                                className='w-full bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-lg mt-[8px] mb-[16px] px-[16px] py-[8px] border border-[2px] border-accent dark:border-dark-accent'
                                id={field.name}
                                name={field.name}
                                placeholder='Écrivez votre adresse mail'
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>

                {/* Mot de passe */}
                <form.Field name="password">
                    {(field) => (
                        <>
                            <label htmlFor={field.name}>Mot de passe</label><br />
                            <input
                                type="password"
                                className='w-full bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-lg mt-[8px] mb-[16px] px-[16px] py-[8px] border border-[2px] border-accent dark:border-dark-accent'
                                id={field.name}
                                name={field.name}
                                placeholder='Écrivez votre mot de passe'
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>

                {/* Message d'erreur */}
                {errorMessage && <p className="text-red-700">{errorMessage}</p>}

                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:outline-0 font-amarante text-lg rounded-sm cursor-pointer bg-text text-accent dark:bg-dark-text dark:text-dark-accent hover:outline-[2px] hover:outline-accent dark:hover:outline-dark-accent w-full mt-[24px]"
                        >
                            {isSubmitting ? '...' : "Se connecter"}
                        </button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    )
}
