'use client'

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, useActiveAccount } from "@/app/thirdweb"

export const Login = () => {
    const account = useActiveAccount();

    return (
        <div>
            
                <div 
                style={{
                    backgroundColor: "#151515",
                    padding: "40px",
                    borderRadius: "10px",
                    textAlign: "center"
                }}>
                    <ConnectButton
                    client={client}
                    chain={chain}
                    />
                    
                </div>
                <div>

                </div>
            
        </div>
    )
}