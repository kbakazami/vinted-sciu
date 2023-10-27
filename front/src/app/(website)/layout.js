"use client";

import HeaderDesktop from "@/app/_components/header/desktop";
import HeaderMobile from "@/app/_components/header/mobile";

export default function WebsiteLayout({children}) {

    return (
        <>
            <HeaderDesktop/>
            <HeaderMobile/>
                {children}
        </>
    )
}