import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import React from 'react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: { },
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-4xl text-green-500">
        Hello {user?.email}!
      </h1>
      <button onClick={() => signOut} className='h-10 w-full bg-white'>
        Sign out
      </button>
    </>
  )
}