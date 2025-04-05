"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { AppleIcon, ArrowLeft, Check, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface TicketModalProps {
  ticket: {
    id: string
    title: string
    date: string
    ticketType: string
    quantity: number
    voucherNumber: string
    orderNumber: string
  }
  onClose: () => void
}

export function TicketModal({ ticket, onClose }: TicketModalProps) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  // Track touch events for swipe to dismiss
  const startY = useRef(0)
  const currentY = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    const diff = currentY.current - startY.current
    if (diff > 100) {
      // If swiped down more than 100px
      handleClose()
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="h-[90vh] overflow-y-auto rounded-t-xl px-4 py-6"
        onInteractOutside={handleClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sheetRef}
      >
        <div className="absolute left-0 right-0 top-0 flex justify-center">
          <div className="h-1.5 w-16 rounded-full bg-muted-foreground/20 my-2"></div>
        </div>

        <SheetHeader className="mt-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handleClose} className="absolute left-4 top-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-center text-lg font-semibold flex-1">Ticket Details</h2>
            <Button variant="ghost" size="icon" onClick={handleClose} className="absolute right-4 top-4">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6 pb-6">
          <div>
            <h3 className="text-lg font-medium">{ticket.title}</h3>
            <p className="text-sm text-muted-foreground">{ticket.date}</p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium">
              {ticket.ticketType} × {ticket.quantity}
            </div>

            <div className="my-6 flex justify-center">
              <div className="h-56 w-56 bg-muted flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">QR Code</div>
                  <div className="mt-2 h-40 w-40 border-2 border-dashed border-muted-foreground mx-auto"></div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="font-medium">Voucher Number:</div>
              <div className="rounded-md bg-muted p-2 text-xs break-all font-mono">{ticket.voucherNumber}</div>
            </div>

            <Button className="mt-4 w-full" variant="outline">
              <AppleIcon className="mr-2 h-4 w-4" />
              Add to Apple Wallet
            </Button>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Voucher Type</h4>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <Separator className="my-2" />
            <p className="text-sm">Show digital ticket with ID</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">How to Redeem</h4>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <Separator className="my-2" />
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Present this digital ticket at the entrance</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Show your ID that matches the ticket name</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Arrive at least 30 minutes before your scheduled time</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Follow the signs to the designated entrance area</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Keep your ticket accessible on your phone throughout your visit</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Link href={`/ticket/${ticket.id}`} className="w-full">
              <Button className="w-full">View Full Details</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

