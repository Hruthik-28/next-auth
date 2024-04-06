"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AboutPage() {
    const router = useRouter();
    const [user, setUser] = useState({ _id: "", email: "", username: "" });

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            toast.success(response.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/users/about");
                setUser(response.data.data);
            } catch (error: any) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error);
            }
        })();
    }, []);

    return (
        <>
            <section className="w-full min-h-screen grid place-items-center">
                <div className="w-full max-w-sm border p-8 space-y-5">
                    <h1 className="text-center font-bold text-xl border-b">
                        Profile
                    </h1>
                    <p>Username: {user?.username}</p>
                    <p>Email: {user?.email}</p>
                    <button
                        type="submit"
                        onClick={logout}
                        className="w-full cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                    >
                        Logout
                    </button>
                    <div className="w-full flex text-center">
                        <Link
                            href={`/about/${user?._id}`}
                            className="w-full bg-teal-600 text-xs rounded-lg p-2"
                        >
                            See your id through dynamic routing in next.js
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
