"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ImageKitProvider } from "imagekitio-next";
import { ToastProvider } from "@heroui/toast";
import { createContext, useContext } from "react";

export interface ProviderProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps
}

declare module "@react-types/shared" {
    interface RouteConfig {
        routerOptions: NonNullable<
            Parameters<ReturnType<typeof useRouter>["push"]>[1]
        >;
    }
}

//create a context for ImageKit authentication
export const ImageKitAuthContext = createContext<{
    authenticate: () => Promise<{
        signature: string;
        token: string;
        expire: number;
    }>;
}>({
    authenticate: async () => ({ signature: "", token: "", expire: 0 }),
});

export const useImageKitAuth = () => useContext(ImageKitAuthContext);

//ImageKit authentication functino
const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit-auth");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("authentication error : ", error);
        throw error;
    }
}

export function Providers({
    children, themeProps
}: ProviderProps) {

    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <ImageKitProvider
                authenticator={authenticator}
                publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
            >
                <ImageKitAuthContext.Provider value={{ authenticate: authenticator }}>
                    <ToastProvider placement="top-right" />
                    <NextThemesProvider {...themeProps}>
                        {children}
                    </NextThemesProvider>
                </ImageKitAuthContext.Provider>
            </ImageKitProvider>
        </HeroUIProvider>
    )
}