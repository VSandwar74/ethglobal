import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';
import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'

export default function DashboardPage() {
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
    logout,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);




    // You'll want to replace this with a wallet from your application
    const wallet = Wallet.createRandom()
    // Create the client with your wallet. This will connect to the XMTP development network by default
    const xmtp = await Client.create(wallet)
    // Start a conversation with XMTP
    const conversation = await xmtp.conversations.newConversation(
      '0x3F11b27F323b62B159D2642964fa27C46C841897'
    )
    // Load all messages in the conversation
    const messages = await conversation.messages()
    // Send a message
    await conversation.send('gm')
    // Listen for new messages in the conversation
    for await (const message of await conversation.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.content}`)
    }
  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col p-12 min-h-screen min-w-full bg-[url(https://drive.google.com/uc?id=1Jn-aQ2byyirIgeZ1sCoZhbM9NUPoRKKd)]">
        <div className='flex flex-row justify-between bg-white/10 text-white items-center p-2 px-4 rounded-full mb-16'>
          <div className='flex flex-row'>
            <img src='https://drive.google.com/uc?id=17sLQ4IMiInbTBcCK8rxkGEK8vbILVLAM' className='w-[35px]' alt='NYU Logo' />
            <p className='font-bold text-white text-2xl'>Arbitrage</p>
          </div>
          <nav className="text-white-[50%] text-xl flex flex-row gap-6">
            <p>Dashboard</p>
            <p>Whitepaper</p>
            <p>Contact</p>
          </nav>
        </div>
        <div className='flex flex-row w-full gap-2'>
          {/* stake */}
          <div className='w-[50%] flex flex-col gap-2' >
            <div>
              <h4 className='bg-white/10  font-semibold text-white text-[34px] rounded-md p-4'>Staked Holdings</h4>
              <form className='flex flex-row'>

              </form>
            </div>
            <div>
              <h4 className='bg-white/10  font-semibold text-white text-[34px] rounded-md p-4'>Deposit</h4>
            </div>
          </div>
          {/* market */}
          <div className='bg-white/10 w-[50%] flex flexcol rounded-md'>
            <h4 className='font-semibold text-white text-[34px] p-4'>Market Data</h4>
            {/* <div> */}
            {/* </div> */}
          </div>
        </div>
        {/* chat */}
        <div className='flex flex-row'>
          <h4 className='font-semibold text-white text-[34px] p-4'>Chat</h4>
        </div>
      </main>
    </>
  );
}
