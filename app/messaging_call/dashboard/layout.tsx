'use client';
import { useAuthenticatedLayout } from "@/components/common/auth_unauthrouting";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useAuthenticatedLayout()
    return (
        <>
            {children}
        </>
    );
}
