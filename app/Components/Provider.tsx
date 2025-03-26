"use client"

import React from "react";
import { ImageKitProvider, IKImage } from "imagekitio-next";
import { SessionProvider } from 'next-auth/react';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
    const authenticator = async () => {
        try {
            const res = await fetch("/api/imagekit-auth");

            if (!res.ok) {
                throw new Error("Authentication Failed for Image");
            }

            return res.json();
        } catch (error) {
            throw error;
        }
    };

    <SessionProvider refetchInterval={5 * 60 }>
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            {children}
        </ImageKitProvider>
    </SessionProvider>
};


