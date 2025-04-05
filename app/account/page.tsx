import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, HelpCircle, Lock, ShieldAlert } from "lucide-react"

export default function AccountPage() {
  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <div className="flex-1 px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-center">My Account</h1>

        <div className="mx-auto max-w-md">
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ShieldAlert className="mr-2 h-5 w-5" />
                  Privacy Policy
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>

              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Lock className="mr-2 h-5 w-5" />
                  Terms of Service
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>

              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="mailto:support@ticketapp.com">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Contact Support
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>TicketApp v1.0.0</p>
            <p className="mt-1">© 2025 TicketApp. All rights reserved.</p>
          </div>
        </div>
      </div>

      <BottomNavigationBar activeTab="account" />
    </main>
  )
}

