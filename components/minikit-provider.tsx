'use client' // Required for Next.js

import { ReactNode, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
const appId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`
export default function MiniKitProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		// Passing appId in the install is optional 
		// but allows you to access it later via `window.MiniKit.appId`
		MiniKit.install(appId) 
	}, [])

	return <>{children}</>
}
