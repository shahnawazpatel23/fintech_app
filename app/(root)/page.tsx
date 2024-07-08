import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
// import RIghtSidebar from '@/components/RIghtSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home: React.FC = async() => {
  const loggedIn =await getLoggedInUser();
  return (
    <section className='home'>
      <div className=" home-content">
        <header className='home-header'>
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.name || 'Guest'}
          subtext="access and manage your account and transactions efficiently "/>

          <TotalBalanceBox 
          accounts={[]}
          totalBanks={3}
          totalCurrentBalance={1234.45} />
        </header>

      </div>
        <RightSidebar user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:45},{currentBalance:459}]} />       
    </section>

  )
}

export default Home