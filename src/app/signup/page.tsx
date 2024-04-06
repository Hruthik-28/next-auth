"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/signup", user);
            toast.success(response.data?.message);
            router.push("/login");

            setLoading(false);
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="flex flex-col justify-center items-center h-[90vh]">
                <div className=" border border-orange-900 p-8 flex flex-col gap-5 w-full max-w-md text-sm">
                    <h1 className="font-bold text-xl text-orange-600">
                        {loading ? "Signing up....." : "SignUp"}
                    </h1>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="username">username</label>
                        <input
                            type="text"
                            id="username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                            placeholder="username"
                            className="rounded-lg p-2 border-gray-800 bg-gray-800 text-orange-400"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            placeholder="email"
                            className="rounded-lg p-2 border-gray-800 bg-gray-800 text-orange-400"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            placeholder="password"
                            className="rounded-lg p-2 border-gray-800 bg-gray-800 text-orange-400"
                        />
                    </div>
                    <div className="w-full mt-2">
                        <button
                            type="submit"
                            onClick={signUp}
                            className="w-full cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                            disabled={buttonDisabled}
                        >
                            Sign Up
                        </button>
                        <p className="text-center mt-2">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="bg-orange-700 px-1 hover:bg-transparent"
                            >
                                login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
