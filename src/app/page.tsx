import Image from "next/image";
import styles from "./page.module.css";
import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Login } from "../../components/Login";
import { Wbtc } from "../../components/Wbtc";
import { Weth } from "../../components/Weth";


export default function Home() {
  return (
    
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      height: "100vh",
      width: "100vw"
    }}>
      
      <div>
        <div style={{
          padding: "10px"
        }}>
          <h1>
          SOS-VAULTS
                </h1>
                <p style={{
                  marginTop: "10px"
                }}>
          Deposit your tokens to earn a percentage of the protocol revenue.
                </p>
        </div>
        <div>
          <Login/>
          
        </div>
        <div style={{
          marginTop: "10px"
        }}>
          <Wbtc />
        </div>
        <div style={{
          marginTop: "48px"
        }}>
          <Weth />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}
