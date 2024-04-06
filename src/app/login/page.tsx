"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const login = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/login", user);
            toast.success(response.data?.message);
            router.push("/about");

            setLoading(false);
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
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
                        {loading ? "Logging in....." : "Login"}
                    </h1>

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
                            onClick={login}
                            className="w-full cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                            disabled={buttonDisabled}
                        >
                            Login
                        </button>
                        <p className="text-center mt-2">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="bg-orange-700 px-1 hover:bg-transparent"
                            >
                                SignUp
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
