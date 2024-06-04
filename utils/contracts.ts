import { getContract } from "thirdweb";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { WBTCPOOL_STAKING_CONTRACT_ABI } from "./wbtcpoolContractABI";
import { WETHPOOL_STAKING_CONTRACT_ABI } from "./wethpoolContractABI";
import { MCHUSDT_STAKING_CONTRACT_ABI } from "./mchpoolContractABI";


const soswbtcTokenContractAddress = "0xa62d36bA2de3Af441EaD1785D3C370Be9b379773";
const soswethTokenContractAddress = "0xF3d05deeb600C53Ef77EC7470868bA9E37e36A91";
const mchusdtTokenContractAddress = "0x46CD3878001FCa6D7C4198B3A99Fc8C8943F04Ef";
const sosudtTokenContractAddress = "0x9FdB6822A7E4213cA6E4DDBf8f1ECEC398f07971";
const wbtcPoolContractAddress = "0x9e50F29c63b0910D46E63D33BF79E11Ec41e3743";
const wethPoolContractAddress = "0x7E022245225167806A89C1A94Edb48b22A991129";
const mchusdtPoolContractAddress = "0x95Aa7b4df28D58FaB1479631008FAb59DC791aFc";



export const SOSWBTC_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: soswbtcTokenContractAddress,
});

export const SOSWETH_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: soswethTokenContractAddress,
});

export const MCHUSDT_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: mchusdtTokenContractAddress,
});

export const SOSUSDT_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: sosudtTokenContractAddress,
});

export const WBTCPOOL_STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: wbtcPoolContractAddress,
    abi: WBTCPOOL_STAKING_CONTRACT_ABI
});

export const WETHPOOL_STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: wethPoolContractAddress,
    abi: WETHPOOL_STAKING_CONTRACT_ABI
});

export const MCHUSDTPOOL_STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: mchusdtPoolContractAddress,
    abi: MCHUSDT_STAKING_CONTRACT_ABI
});