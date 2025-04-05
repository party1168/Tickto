import Link from "next/link"
import { Home, Ticket, User } from "lucide-react"

interface BottomNavigationBarProps {
  activeTab: "home" | "order" | "account"
}

export function BottomNavigationBar({ activeTab }: BottomNavigationBarProps) {
  const tabs = [
    {
      name: "home",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      name: "order",
      label: "Order",
      icon: <Ticket className="h-5 w-5" />,
      href: "/order",
    },
    {
      name: "account",
      label: "Account",
      icon: <User className="h-5 w-5" />,
      href: "/account",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t bg-background shadow-sm">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`flex h-full w-full flex-col items-center justify-center ${
            activeTab === tab.name ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {tab.icon}
          <span className="mt-1 text-xs">{tab.label}</span>
        </Link>
      ))}
    </div>
  )
}

