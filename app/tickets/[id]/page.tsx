import Link from "next/link"
import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Calendar, Clock, Info, MapPin, AlertTriangle, Ticket, Plane } from "lucide-react"

// Mock ticket data
const ticketsData = [
  {
    id: "1",
    title: "Paris Weekend Getaway",
    description:
      "Experience the magic of Paris with this exclusive weekend package. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Enjoy authentic French cuisine and immerse yourself in the romantic atmosphere of the City of Light.",
    location: "Paris, France",
    date: "May 15-17, 2025",
    duration: "3 days, 2 nights",
    image: "/placeholder.svg?height=400&width=800",
    ticketTypes: [
      { type: "Adult", price: 299 },
      { type: "Child (5-12)", price: 149 },
      { type: "Family (2 adults + 2 children)", price: 799 },
    ],
    importantInfo: [
      "Passport required for international travel",
      "Check-in at hotel starts at 3:00 PM",
      "Breakfast included at the hotel",
      "Tour guide available in English, French, and Spanish",
      "Travel insurance recommended",
    ],
    cancellationPolicy:
      "Free cancellation up to 7 days before the trip. 50% refund for cancellations between 3-7 days. No refund for cancellations less than 3 days before the trip.",
    includedItems: [
      "Round-trip flight tickets",
      "Hotel accommodation (3-star or equivalent)",
      "Daily breakfast",
      "Guided city tour",
      "Airport transfers",
    ],
    additionalNotes:
      "Please arrive at the airport at least 3 hours before departure. Comfortable walking shoes are recommended. Weather in Paris can be unpredictable, so pack accordingly.",
  },
  {
    id: "2",
    title: "Tokyo Adventure Pass",
    description:
      "Discover the vibrant city of Tokyo with our comprehensive adventure pass. Explore traditional temples, futuristic districts, and world-class shopping. Includes guided tours to Tokyo Tower, Shibuya Crossing, and Senso-ji Temple.",
    location: "Tokyo, Japan",
    date: "Jun 10-15, 2025",
    duration: "6 days, 5 nights",
    image: "/placeholder.svg?height=400&width=800",
    ticketTypes: [
      { type: "Adult", price: 399 },
      { type: "Child (5-12)", price: 199 },
      { type: "Family (2 adults + 2 children)", price: 999 },
    ],
    importantInfo: [
      "Passport required for international travel",
      "Check-in at hotel starts at 2:00 PM",
      "Breakfast included at the hotel",
      "Tour guide available in English and Japanese",
      "Travel insurance recommended",
    ],
    cancellationPolicy:
      "Free cancellation up to 14 days before the trip. 50% refund for cancellations between 7-14 days. No refund for cancellations less than 7 days before the trip.",
    includedItems: [
      "Round-trip flight tickets",
      "Hotel accommodation (4-star or equivalent)",
      "Daily breakfast",
      "Tokyo Metro pass",
      "Guided city tour",
      "Airport transfers",
    ],
    additionalNotes:
      "Please arrive at the airport at least 3 hours before departure. Japan uses different electrical outlets, so bring an adapter. Tokyo can be very crowded, especially during rush hours.",
  },
  {
    id: "3",
    title: "New York City Explorer",
    description:
      "Take a bite out of the Big Apple with our NYC Explorer package. Visit Times Square, Central Park, and the Statue of Liberty. Experience Broadway shows, world-class museums, and the vibrant neighborhoods that make New York City unforgettable.",
    location: "New York, USA",
    date: "Jul 4-6, 2025",
    duration: "3 days, 2 nights",
    image: "/placeholder.svg?height=400&width=800",
    ticketTypes: [
      { type: "Adult", price: 249 },
      { type: "Child (5-12)", price: 129 },
      { type: "Family (2 adults + 2 children)", price: 699 },
    ],
    importantInfo: [
      "Valid ID required for domestic travel",
      "Check-in at hotel starts at 4:00 PM",
      "Breakfast not included",
      "Tour guide available in English",
      "Travel insurance recommended",
    ],
    cancellationPolicy:
      "Free cancellation up to 7 days before the trip. 50% refund for cancellations between 3-7 days. No refund for cancellations less than 3 days before the trip.",
    includedItems: [
      "Hotel accommodation (3-star or equivalent)",
      "New York City Pass for attractions",
      "Hop-on Hop-off bus tour",
      "One Broadway show ticket per person",
    ],
    additionalNotes:
      "New York City is best explored on foot and via subway. Comfortable walking shoes are essential. Weather can vary, so check the forecast before packing.",
  },
]

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // Find the ticket data based on the ID
  const ticket = ticketsData.find((t) => t.id === params.id) || ticketsData[0]

  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <div className="relative h-64 w-full overflow-hidden">
        <img src={ticket.image || "/placeholder.svg"} alt={ticket.title} className="h-full w-full object-cover" />
        <div className="absolute left-4 top-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <h1 className="mb-2 text-2xl font-bold">{ticket.title}</h1>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{ticket.location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{ticket.duration}</span>
          </div>
        </div>

        <p className="mb-6 text-muted-foreground">{ticket.description}</p>

        <h2 className="mb-4 text-xl font-semibold">Ticket Options</h2>

        <div className="mb-6 space-y-4">
          {ticket.ticketTypes.map((ticketType, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{ticketType.type}</h3>
                  <p className="font-semibold">{ticketType.price} USDC</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="important-info">
            <AccordionTrigger className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Important Information</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                {ticket.importantInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="whats-included">
            <AccordionTrigger className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-green-500" />
              <span>What's Included</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                {ticket.includedItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cancellation-policy">
            <AccordionTrigger className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-500" />
              <span>Cancellation Policy</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{ticket.cancellationPolicy}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="additional-notes">
            <AccordionTrigger className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-purple-500" />
              <span>Travel Notes</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{ticket.additionalNotes}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="sticky bottom-16 bg-background pt-4">
          <Button className="w-full" size="lg">
            Buy Now
          </Button>
        </div>
      </div>

      <BottomNavigationBar activeTab="home" />
    </main>
  )
}

