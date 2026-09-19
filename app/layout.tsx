import type { Metadata, Viewport } from "next";
import "./globals.css";
export const viewport: Viewport = {width:"device-width",initialScale:1,viewportFit:"cover"};
export const metadata: Metadata = {title:"Hanzi Steps — Traditional Chinese",description:"Learn your first Traditional Chinese characters through guided handwriting, character parts, and Taiwanese Mandarin.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}