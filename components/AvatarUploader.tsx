"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AvatarUploader() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // Upload dans Supabase Storage
        const { error } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

        if (error) {
            console.error("Erreur d'upload :", error);
            setLoading(false);
            return;
        }

        // Récupération de l’URL publique
        const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

        setImageUrl(data.publicUrl);
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center gap-4" >
            {
                imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        Aucun avatar
                    </ div >
                )
            }

            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" >
                {loading ? "Upload..." : "Choisir une image"}
                < input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
        </div>
    );
}
