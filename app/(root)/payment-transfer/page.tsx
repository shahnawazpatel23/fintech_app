
import HeaderBox from '@/components/HeaderBox'

import { getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import React from 'react'
import { redirect, useRouter } from 'next/navigation'


const Transfer = async() => {

  const loggedIn = await getLoggedInUser();
  
  if(!loggedIn) return redirect('/sign-up')
  const accounts = await getAccounts({
    userId:loggedIn.$id
  })
  if(!accounts) return;
  const accountsData = accounts?.data;
  
  return (
    <section className='payment-transfer'>
      <HeaderBox title='Payment Transfer'
      subtext='Please provide specific details or notes related to the payment transfer'/>

      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}

export default Transfer