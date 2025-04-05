"use client";
import { TopNavigationBar } from "@/components/top-navigation-bar";
import { BottomNavigationBar } from "@/components/bottom-navigation-bar";
import { TicketCard } from "@/components/ticket-card";
import { HomeBanner } from "@/components/home-banner";
import {
  MiniKit,
  VerifyCommandInput,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";

// Mock ticket data
const tickets = [
  {
    id: "1",
    title: "Paris Weekend Getaway",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Tokyo Adventure Pass",
    price: 399,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "New York City Explorer",
    price: 249,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Bali Beach Retreat",
    price: 349,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "London Cultural Tour",
    price: 279,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Rome Historical Pass",
    price: 229,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "7",
    title: "Sydney Harbor Cruise",
    price: 189,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "8",
    title: "Dubai Desert Safari",
    price: 319,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [miniKitStatus, setMiniKitStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const verifyPayload: VerifyCommandInput = {
    action: "verify_human", // This is your action ID from the Developer Portal
    verification_level: VerificationLevel.Device, // Orb | Device
  };

  const handleVerify = async () => {
    try {
      // Check if MiniKit is installed and ready to use
      if (!MiniKit.isInstalled()) {
        console.log("MiniKit is not installed yet");
        setMiniKitStatus('loading');
        return;
      }
      
      setMiniKitStatus('ready');
      
      // World App will open a drawer prompting the user to confirm the operation, promise is resolved once user confirms or cancels
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);
      if (finalPayload.status === "error") {
        console.log("Error payload", finalPayload);
        return;
      }

      // Verify the proof in the backend
      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
          action: "verify_human",
        }),
      });

      // TODO: Handle Success!
      const verifyResponseJson = await verifyResponse.json();
      if (verifyResponseJson.status === 200) {
        console.log("Verification success!");
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMiniKitStatus('error');
    }
  };

  useEffect(() => {
    // Check initial MiniKit status
    if (typeof window !== 'undefined') {
      const checkMiniKit = () => {
        if (MiniKit.isInstalled()) {
          setMiniKitStatus('ready');
          if (!isVerified) {
            handleVerify();
          }
        } else {
          // If not installed yet, retry after a delay
          setTimeout(checkMiniKit, 1000);
        }
      };
      
      checkMiniKit();
    }
  }, []);

  // Render loading state if MiniKit is not ready
  if (miniKitStatus === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Initializing World App connection...</p>
        </div>
      </div>
    );
  }
  
  // Render error state if MiniKit failed to load
  if (miniKitStatus === 'error') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center p-6 max-w-md">
          <div className="mb-4 text-red-500 text-5xl">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="mb-4">Unable to connect to World App. Please make sure it's installed and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <HomeBanner />

      <div className="flex-1 px-4 py-6">
        <h2 className="mb-4 text-xl font-semibold">Popular Destinations</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              price={ticket.price}
              image={ticket.image}
            />
          ))}
        </div>

        <h2 className="mb-4 mt-8 text-xl font-semibold">
          Trending Destinations
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tickets.slice(4, 8).map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              price={ticket.price}
              image={ticket.image}
            />
          ))}
        </div>
      </div>

      <BottomNavigationBar activeTab="home" />
    </main>
  );
}
