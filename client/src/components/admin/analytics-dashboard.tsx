import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { Users, CreditCard, MessageSquare, TrendingUp, DollarSign, Activity } from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalInquiries: number;
  totalPayments: number;
  totalRevenue: number;
  recentPayments: any[];
  inquiriesByStatus: { status: string; count: number }[];
}

export default function AnalyticsDashboard() {
  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ["/api/admin/analytics"],
  });

  // Fallback data for demonstration
  const fallbackAnalytics: AnalyticsData = {
    totalUsers: 1,
    totalInquiries: 0,
    totalPayments: 0,
    totalRevenue: 0,
    recentPayments: [],
    inquiriesByStatus: []
  };

  const displayAnalytics = analytics || fallbackAnalytics;

  const inquiriesChartData = displayAnalytics.inquiriesByStatus.map(item => ({
    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    count: item.count
  }));

  const pieColors = ['#14b8a6', '#10b981', '#84cc16', '#eab308'];

  if (error) {
    console.error("Error loading analytics:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Overview of your CareerMentoria platform performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-users">
              {displayAnalytics.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              Admin accounts registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-inquiries">
              {displayAnalytics.totalInquiries}
            </div>
            <p className="text-xs text-muted-foreground">
              Contact form submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-payments">
              {displayAnalytics.totalPayments}
            </div>
            <p className="text-xs text-muted-foreground">
              Successful transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-revenue">
              ₹{displayAnalytics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From completed payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Inquiries by Status</CardTitle>
            <CardDescription>
              Distribution of inquiry statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {inquiriesChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inquiriesChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, count }) => `${status}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {inquiriesChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No inquiry data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayAnalytics.recentPayments.length > 0 ? (
                displayAnalytics.recentPayments.slice(0, 5).map((payment, index) => (
                  <div key={payment.id} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        Payment from {payment.customerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ₹{parseInt(payment.amount).toLocaleString()} - {payment.planType}
                      </p>
                    </div>
                    <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-8 h-8 mx-auto mb-2" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Summary</CardTitle>
          <CardDescription>
            Key performance indicators for your career guidance platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {displayAnalytics.totalInquiries > 0 
                  ? Math.round((displayAnalytics.totalPayments / displayAnalytics.totalInquiries) * 100)
                  : 0}%
              </div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-xs text-muted-foreground mt-1">
                Inquiries to payments ratio
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                ₹{displayAnalytics.totalPayments > 0 
                  ? Math.round(displayAnalytics.totalRevenue / displayAnalytics.totalPayments).toLocaleString()
                  : 0}
              </div>
              <p className="text-sm text-muted-foreground">Average Order Value</p>
              <p className="text-xs text-muted-foreground mt-1">
                Revenue per transaction
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {displayAnalytics.inquiriesByStatus.find(s => s.status === 'new')?.count || 0}
              </div>
              <p className="text-sm text-muted-foreground">Pending Inquiries</p>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting response
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
