import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { TopProducts } from "@/components/dashboard/top-products"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio</p>
      </div>
      <DashboardCards />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  )
}
