"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // import CSS for Skeleton

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);

  useEffect(() => {
    const getLinkToken = async () => {
      setTokenLoading(true);
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
      setTokenLoading(false);
    }

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    setLoading(true);
    await exchangePublicToken({
      publicToken: public_token,
      user,
    });
    setLoading(false);
    router.push('/');
  }, [user, router]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  }

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {tokenLoading || loading ? (
        <SkeletonTheme baseColor="#d3d3d3" highlightColor="#f0f0f0">
          <p>
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      ) : (
        variant === 'primary' ? (
          <Button
            onClick={() => open()}
            disabled={!ready}
            className="plaidlink-primary"
          >
            Connect bank
          </Button>
        ) : variant === 'ghost' ? (
          <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
            <Image 
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}
            />
            <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
          </Button>
        ) : (
          <Button onClick={() => open()} className="plaidlink-default">
            <Image 
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}
            />
            <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
          </Button>
        )
      )}
    </>
  )
}

export default PlaidLink;