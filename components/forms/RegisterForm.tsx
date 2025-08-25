'use client'

import { useState } from "react"

import { useForm } from "@tanstack/react-form"
import type { AnyFieldApi } from "@tanstack/react-form"
import axios from 'axios';

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

export function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            passwordBis: '',
            email: '',

        },
        onSubmit: async ({ value }) => {
            console.log('Inscription en cours:', value);

            const API_URL = "https://forgedesmondes-back.onrender.com/users";

            try {
                const response = await axios.post(API_URL, {
                    email: value.email,
                    password: value.password,
                    confirmPassword: value.passwordBis,
                    username: value.username,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Inscription réussie:', response.data);

                window.location.href = "/login";
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error('Erreur d\'inscription:', error.response?.data || error.message);
                    setErrorMessage('Une erreur s\'est produite');
                } else if (error instanceof Error) {
                    console.error('Erreur d\'inscription:', error);
                    setErrorMessage('Une erreur s\'est produite');
                } else {
                    console.error('Erreur inconnue:', error);
                    setErrorMessage('Une erreur inconnue s\'est produite');
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
                {/* Pseudo */}
                <form.Field
                    name="username"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value || value.trim() === "") {
                                return "Le pseudo est obligatoire";
                            }
                        }
                    }}
                >
                    {(field) => (
                        <>
                            <label htmlFor={field.name}>Pseudo</label><br />
                            <input
                                type="text"
                                className='w-full bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-lg mt-[8px] mb-[16px] px-[16px] py-[8px] border border-[2px] border-accent dark:border-dark-accent'
                                id={field.name}
                                name={field.name}
                                placeholder='Écrivez votre pseudo'
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>

                {/* Email */}
                <form.Field
                    name="email"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value || value.trim() === "") {
                                return "L'adresse mail est obligatoire";
                            }
                        }
                    }}
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

                {/* Mot de passe bis */}
                <form.Field
                    name="passwordBis"
                    validators={{
                        onChange: ({ value, fieldApi }) => {
                            if (value !== fieldApi.form.getFieldValue("password")) {
                                return "Les mots de passe ne correspondent pas";
                            }
                            return undefined;
                        }
                    }}
                >
                    {(field) => (
                        <>
                            <label htmlFor={field.name}>Vérification du mot de passe</label><br />
                            <input
                                type="password"
                                className='w-full bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-lg mt-[8px] mb-[16px] px-[16px] py-[8px] border border-[2px] border-accent dark:border-dark-accent'
                                id={field.name}
                                name={field.name}
                                placeholder='Réécrivez votre mot de passe'
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
                            {isSubmitting ? '...' : "S'inscrire"}
                        </button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    )
}