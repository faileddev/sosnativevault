'use client'

import Image from "next/image";
import  Logo from "./SOS.png";
import { ConnectButton } from "@/app/thirdweb";
import { client } from "@/app/client";
import { chain } from "@/app/chain";

export const Header = () => {
    return (
    
    <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        marginBottom: "20px"
      }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
        }} >
            
            <Image 
            src={Logo}
            alt='logo'/>

            
            

        </div>
    </div>
)}