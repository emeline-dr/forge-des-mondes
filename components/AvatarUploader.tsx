"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Cookies from "js-cookie";

export default function AvatarUploader() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
            const publicUrl = data.publicUrl;

            const token = Cookies.get("authToken");
            if (!token) throw new Error("Utilisateur non authentifié");

            const res = await fetch("https://forgedesmondes-back.onrender.com/users/avatar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ avatarUrl: publicUrl }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Erreur lors de la mise à jour de l'avatar");
            }

            setImageUrl(publicUrl);
        } catch (err: any) {
            console.error("Erreur avatar :", err.message);
        } finally {
            setLoading(false);
        }
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
