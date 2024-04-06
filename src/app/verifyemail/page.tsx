"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmailPage() {
    const token = useSearchParams().get("token") || "";
    const [verified, setVerified] = useState(false);

    const verifyEmail = async () => {
        try {
            setVerified(false);
            const response = await axios.post("/api/users/verifyemail", {
                token,
            });
            toast.success(response.data.message);
            setVerified(true);
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        verifyEmail()
    }, [token])

    return (
        <>
            <div className="w-full h-[90vh] flex justify-center items-center">
                {verified ? (
                    <div className="w-44 flex flex-col text-center gap-3">
                        <p className="text-lg font-semibold">
                            Email is verified !!!
                        </p>
                        <Link
                            href={"/login"}
                            className="w-full cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                        >
                            Login to continue
                        </Link>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center gap-4">
                        <h1 className="font-bold text-xl border-b my-5">Verify your email</h1>
                        <p>
                            Token: <span className="bg-gray-800 p-1">{token}</span>
                        </p>
                        <button
                            type="submit"
                            onClick={verifyEmail}
                            className="w-44 cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                        >
                            Verify email
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
