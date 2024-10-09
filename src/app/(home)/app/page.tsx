"use client"
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'

function Page() {
    const router = useRouter();
    useEffect(() => {
       router.replace('/app/today')
    }, [])
  return (
    <div></div>
  )
}

export default Page