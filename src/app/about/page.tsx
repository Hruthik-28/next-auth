"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
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
                console.log(response.data.data);
                toast.success(response.data.message);
            } catch (error: any) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error);
            }
        })();
    }, []);

    return (
        <>
            <section className="w-full h-[100vh] grid place-items-center">
                <div className="w-full max-w-sm border p-8 space-y-5">
                    <h1 className="text-center font-bold text-xl border-b">
                        Profile
                    </h1>
                    <p>userId: {user?._id}</p>
                    <p>Username: {user?.username}</p>
                    <p>Email: {user?.email}</p>
                    <button
                        type="submit"
                        onClick={logout}
                        className="w-full cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                    >
                        Logout
                    </button>
                </div>
            </section>
        </>
    );
}

export default Page;
