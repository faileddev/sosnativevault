'use client'

import Image from "next/image";
import weth from "./rocket-pool-eth-reth-logo.png";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton } from "@/app/thirdweb"
import { SOSUSDT_TOKEN_CONTRACT, SOSWBTC_TOKEN_CONTRACT, SOSWETH_TOKEN_CONTRACT, WBTCPOOL_STAKING_CONTRACT, WETHPOOL_STAKING_CONTRACT } from "../utils/contracts";
import { approve, balanceOf } from "thirdweb/extensions/erc20";
import { useReadContract, useActiveAccount, TransactionButton } from "thirdweb/react";
import { useEffect, useState } from "react";
import { prepareContractCall, toEther, toWei } from "thirdweb";

export const Weth = () => {
    const account = useActiveAccount();

    const [stakeAmount, setStakeAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [stakingState, setStakingState] = useState("init" || "approved");
    const [isStaking, setIsStaking] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const { 
        data: wethTokenBalance, 
        isLoading: loadingWethTokenBalance
    } = useReadContract (
        balanceOf,
        {
            contract: SOSWETH_TOKEN_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account,
            }
        }
    );

    const { 
        data: usdtTokenBalance, 
        isLoading: loadingUsdtTokenBalance
    } = useReadContract (
        balanceOf,
        {
            contract: SOSUSDT_TOKEN_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account,
            }
        }
    );

    const {
        data: stakeInfo,
        refetch: refetchStakeInfo,
    } = useReadContract ({
        contract: WETHPOOL_STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
        queryOptions: {
            enabled: !!account,
        }
    });

    function truncate(value: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(value);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be convertible to a number.')
        }
        const factor: number = Math.pow(10, decimalPlaces);
        return Math.trunc(numericValue * factor) / factor;
    };

    useEffect(() => {
        setInterval(() => {
            refetchStakeInfo();
        }, 10000);
    }, []);
    

    function refetchRewardTokenBalance() {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            {account && (
                <div 
                style={{
                    backgroundColor: "#151515",
                    padding: "40px",
                    borderRadius: "10px",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        
                            <div>
                                <Image
                                src={weth}
                                alt='weth'
                                height='50'/>
                            </div>
                        
                        
                            <div style={{
                                justifyContent: "end",
                                textAlign: "end"
                            }}>
                                <p style={{
                                    fontSize: "28px",
                                    fontWeight: "bold"
                                }}>
                                    WETH POOL
                                </p>
                                <p 
                                style={{fontSize: "10px",
                                    
                                }}>
                                    Earn 4 USDT/Hr for every 1ETH you stake
                                </p>
                            </div>
                            
                        
                        
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginTop: "20px",
                    }}>
                        <p style={{
                            fontSize: "10px"
                        }}>
                            WETH in my wallet:
                        </p>
                        {loadingWethTokenBalance ? (
                            <h2>Loading...</h2>
                        ) : (
                            
                            <p style={{
                                fontSize: "62px",
                                fontWeight: "bold"
                            }}>{truncate(toEther(wethTokenBalance!),6)}</p>
                            
                            
                        )}
                        
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        marginTop: "20px",
                    }}>
                        
                        
                    </div>
                        
                    {stakeInfo && (
                        <>
                    
                    <p style={{
                        fontSize:"10px"
                    }}>WETH Deposited:</p>
                    <div style={{
                        display: "flex",
                        alignItems: "baseline"
                        
                    }}>
                        <p style={{
                            fontSize: "62px",
                            fontWeight: "bold"
                        }}>
                            {truncate(toEther(stakeInfo[0]).toString(),6)}</p>
                        <p style={{
                            marginLeft: "6px",
                            fontSize: "12px"
                        }}>
                            WETH
                        </p>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <button 
                            style={{
                            marginTop: "20px",
                            padding: "10px",
                            backgroundColor: "red",
                            border: "none",
                            borderRadius: "6px",
                            color: "white",
                            fontSize: "1rem",
                            width: "50%",
                            height: "60px",
                            cursor: "pointer"

                                }}
                                onClick={() => setIsStaking(true)}

                                >Deposit</button>
                                <button
                                style={{
                                    marginTop: "20px",
                                    marginLeft: "10px",
                                    padding: "10px",
                                    backgroundColor: "red",
                                    border: "none",
                                    borderRadius: "6px",
                                    color: "white",
                                    fontSize: "1rem",
                                    width: "50%",
                                    height: "60px",
                                    cursor: "pointer"

                                }}
                                onClick={() => setIsWithdrawing(true)}
                                >Withdraw</button>
                            </div>
                            <div style={{
                                marginTop: "40px",
                                
                            }}>
                                
                                
                                    <p>Unclaimed Rewards: </p>
                                        <div  style={{
                        display: "flex",
                        alignItems: "baseline"}}
                        >
                                        <p style={{
                                            fontSize: "62px",
                                            fontWeight: "bold",
                                            
                                        }}>{truncate(toEther(stakeInfo[1]).toString(),2)}</p>
                                        <p style={{
                                                marginLeft: "6px",
                                                fontSize: "12px"
                                            }}>
                                                USDT
                                            </p>
                                </div>
                                <div style={{
                                    marginTop: "10px"
                                }}>
                                    <TransactionButton style={{
                                        width:"100%",
                                        height: "60px",
                                        backgroundColor: "red",
                                        color: "white",
                                    }}
                                        transaction={() => (
                                            prepareContractCall({
                                                contract: WETHPOOL_STAKING_CONTRACT,
                                                method: "claimRewards",
                                            })
                                        )}
                                        onTransactionConfirmed={() => {
                                            refetchRewardTokenBalance();
                                            refetchStakeInfo();
                                        }}
                                    >
                                        Claim Reward
                                    </TransactionButton>
                                </div>
                            </div>
                           </>
                        )}
                        {isWithdrawing && (
                            <div style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#151515",
                                    padding: "40px",
                                    borderRadius: "10px",
                                    minWidth: "300px"
                                }}>
                                    <button 
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                        padding: "5px",
                                        margin: "5px",
                                        fontSize: "0.5rem"
                                    }}
                                    onClick={() => setIsWithdrawing(false)}
                                    >
                                        X
                                    </button>
                                    <h3>
                                        Withdraw WETH 
                                    </h3>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Available to deposit:
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "baseline"}}>
                                        <p
                                        style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(wethTokenBalance!),6)} </p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>WETH</p>
                                    </div>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Available to withdraw:</p>
                                        
                                    <div style={{
                        display: "flex",
                        alignItems: "baseline"}}>
                                        <p style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(stakeInfo[0]).toString(),6)}</p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>WETH</p>
                                    </div>
                                    <input
                                    type="number"
                                    placeholder="0.0"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                    style={{
                                        marginTop: "10px",
                                        padding: "5px",
                                        borderRadius: "5px",
                                        border: "1px solid #333",
                                        width: "100%",
                                    }}
                                    />
                                    <TransactionButton style={{
                                        marginTop: "10px",
                                        backgroundColor: "red",
                                        color: "white",
                                    }}
                                    transaction={() => ( 
                                        prepareContractCall({
                                            contract: WETHPOOL_STAKING_CONTRACT,
                                            method: "withdraw",
                                            params: [toWei(withdrawAmount.toString())],
                                        })
                                    )}
                                    onTransactionConfirmed={() => {
                                        setWithdrawAmount(0);
                                        refetchStakeInfo();
                                        refetchStakingTokenBalance();
                                        setIsWithdrawing(false);
                                    }}
                                    >Withdraw</TransactionButton>
                                </div>
                            </div>
                        )}
                        {isStaking && (
                            <div style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#151515",
                                    padding: "40px",
                                    borderRadius: "10px",
                                    minWidth: "300px"
                                }}>
                                    <button 
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                        padding: "5px",
                                        margin: "5px",
                                        fontSize: "0.5rem"
                                    }}
                                    onClick={() => setIsStaking(false)}
                                    >
                                        X
                                    </button>
                                    <h3>
                                        Deposit WETH 
                                    </h3>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Available to deposit:
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "baseline"}}>
                                        <p
                                        style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(wethTokenBalance!),6)} </p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>WETH</p>
                                    </div>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Deposited</p>
                                        
                                    <div style={{
                        display: "flex",
                        alignItems: "baseline"}}>
                                        <p style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(stakeInfo[0]).toString(),6)}</p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>WETH</p>
                                    </div>
                                    {stakingState === "init" ? (
                                        <>
                                        <input 
                                            type="number" 
                                            placeholder="0.0" 
                                            value={stakeAmount} 
                                            onChange={(e) => setStakeAmount(Number(e.target.value))}
                                            style={{
                                                marginTop: "10px",
                                                padding: "5px",
                                                borderRadius: "5px",
                                                border: "1px solid #333",
                                                width: "100%",
                                            }}
                                        />

                                        <TransactionButton style={{
                                            backgroundColor: "red",
                                            color: "white",
                                        }}
                                            transaction={() => (
                                                approve({
                                                    contract: SOSWETH_TOKEN_CONTRACT,
                                                    spender: WETHPOOL_STAKING_CONTRACT.address,
                                                    amount: stakeAmount,
                                                })
                                            )}
                                            onTransactionConfirmed={() => (
                                                setStakingState("approved")
                                            )}
                                            style={{
                                                width: "100%",
                                                margin: "10px 0"
                                            }}
                                            >
                                                Approve
                                            </TransactionButton>
                                        
                                    </>
                                    ) : (
                                    <>
                                    <h3 style={{margin: "10px 0"}}>{stakeAmount}</h3>
                                    <TransactionButton
                                     transaction={() => (
                                        prepareContractCall({
                                            contract: WETHPOOL_STAKING_CONTRACT,
                                            method: "stake",
                                            params: [toWei(stakeAmount.toString())]
                                        })
                                     )}
                                     onTransactionConfirmed={() => {
                                        setStakeAmount(0);
                                        setStakingState("init");
                                        refetchStakeInfo();
                                        refetchStakingTokenBalance();
                                        setIsStaking(false)
                                     }}
                                     >
                                        Deposit
                                    </TransactionButton>
                                    </>    
                                    )}

                                </div>
                            </div>
                        )}
                        
                        
                </div>
)}
                <div>

                </div>
            
        </div>
    )
}