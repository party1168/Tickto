"use client"

import { useState } from "react"
import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TicketModal } from "@/components/ticket-modal"

// Mock purchased tickets data
const purchasedTickets = [
  {
    id: "T12345",
    title: "Paris Weekend Getaway",
    date: "May 15-17, 2025",
    ticketType: "Adult",
    quantity: 2,
    status: "active",
    voucherNumber: "PRSW-2025-05-15-ABC123XYZ",
    orderNumber: "ORD-98765",
    purchaseDate: "Apr 2, 2025",
    name: "John Doe",
    price: 299,
  },
  {
    id: "T12346",
    title: "Tokyo Adventure Pass",
    date: "Jun 10-15, 2025",
    ticketType: "Adult",
    quantity: 1,
    status: "active",
    voucherNumber: "TKYO-2025-06-10-DEF456UVW",
    orderNumber: "ORD-98766",
    purchaseDate: "Mar 15, 2025",
    name: "John Doe",
    price: 399,
  },
  {
    id: "T12347",
    title: "New York City Explorer",
    date: "Jul 4-6, 2025",
    ticketType: "Family",
    quantity: 4,
    status: "active",
    voucherNumber: "NYC-2025-07-04-GHI789RST",
    orderNumber: "ORD-98767",
    purchaseDate: "Apr 10, 2025",
    name: "John Doe",
    price: 249,
  },
]

export default function OrderPage() {
  const [selectedTicket, setSelectedTicket] = useState<(typeof purchasedTickets)[0] | null>(null)

  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <div className="flex-1 px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">My Tickets</h1>

        <div className="space-y-4">
          {purchasedTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
              onClick={() => setSelectedTicket(ticket)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{ticket.title}</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Travel Date: {ticket.date}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm">
                    {ticket.ticketType} × {ticket.quantity}
                  </span>
                  <span className="text-sm font-medium">Tap to view</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedTicket && <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}

      <BottomNavigationBar activeTab="order" />
    </main>
  )
}

