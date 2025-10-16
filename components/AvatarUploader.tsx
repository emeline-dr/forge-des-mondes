"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface AvatarUploaderProps {
    id: string; // l'id de l'utilisateur connecté
}

export default function AvatarUploader({ id }: AvatarUploaderProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // 1️⃣ Upload dans Supabase Storage
        const { error } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

        if (error) {
            console.error("Erreur d'upload :", error);
            setLoading(false);
            return;
        }

        const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
        const publicUrl = data.publicUrl;

        const res = await fetch("http://forgedesmondes-back.onrender.com/users/avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, avatarUrl: publicUrl }),
        });

        if (!res.ok) {
            console.error("Erreur lors de la mise à jour de l'avatar en DB");
        }

        setImageUrl(publicUrl);
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    Aucun avatar
                </div>
            )}

            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                {loading ? "Upload..." : "Choisir une image"}
                <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
        </div>
    );
}
