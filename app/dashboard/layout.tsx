import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: 'swap'
})

export default function DashboardLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <main className={bricolage.className}>
            {children}
        </main>
    )
}