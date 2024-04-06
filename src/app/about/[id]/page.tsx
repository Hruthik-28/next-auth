"use client";

import { useRouter } from "next/navigation";

function Page({ params }: any) {
    const router = useRouter();
    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-5">
                <h1 className="border-b text-lg">
                    USER_ID:{" "}
                    <span className="text-orange-600">{params.id}</span>
                </h1>
                <button
                    type="submit"
                    onClick={() => router.push("/about")}
                    className="w-28 cursor-pointer p-2 hover:opacity-80 rounded-lg bg-orange-600 text-base font-medium"
                >
                    Go back
                </button>
            </div>
        </>
    );
}

export default Page;
