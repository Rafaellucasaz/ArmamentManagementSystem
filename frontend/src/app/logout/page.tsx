"use client"

import { useEffect } from "react"

export default function Logout(){

    useEffect(() => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
        window.location.href = '/';
    },[])

    return (
        <div>

        </div>
    )
}