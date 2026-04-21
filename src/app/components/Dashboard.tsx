import { Card } from "./ui/card";
import { 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Activity,
  Users,
  Package
} from "lucide-react";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Dashboard() {
  const stats = [
    {
      title: "Active Maintenance",
      value: "12",
      change: "+3 from last week",
      trend: "+25%",
      icon: Wrench,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Requisitions",
      value: "8",
      change: "+2 from last week",
      trend: "+33%",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Completed This Month",
      value: "45",
      change: "+12 from last month",
      trend: "+36%",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Overdue Tasks",
      value: "3",
      change: "Requires attention",
      trend: "-1",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const maintenanceByType = [
    { name: "Preventive", value: 45, color: "#3b82f6" },
    { name: "Corrective", value: 30, color: "#f59e0b" },
    { name: "Inspection", value: 15, color: "#10b981" },
    { name: "Emergency", value: 10, color: "#ef4444" },
  ];

  const weeklyTrend = [
    { day: "Mon", completed: 8, pending: 5 },
    { day: "Tue", completed: 12, pending: 7 },
    { day: "Wed", completed: 10, pending: 6 },
    { day: "Thu", completed: 15, pending: 8 },
    { day: "Fri", completed: 11, pending: 4 },
    { day: "Sat", completed: 6, pending: 2 },
    { day: "Sun", completed: 4, pending: 1 },
  ];

  const equipmentStatus = [
    { name: "Operational", value: 68, color: "#10b981" },
    { name: "Maintenance", value: 12, color: "#f59e0b" },
    { name: "Out of Service", value: 5, color: "#ef4444" },
  ];

  const topEquipmentMaintenance = [
    { equipment: "Forklift Fleet", count: 18, status: 85 },
    { equipment: "Conveyor Systems", count: 12, status: 92 },
    { equipment: "Loading Docks", count: 8, status: 78 },
    { equipment: "Pallet Jacks", count: 15, status: 88 },
    { equipment: "Warehouse Cranes", count: 6, status: 95 },
  ];

  const recentMaintenance = [
    { id: "M-2026-001", equipment: "Forklift FL-205", status: "In Progress", priority: "High", date: "2026-02-15", technician: "John Smith" },
    { id: "M-2026-002", equipment: "Conveyor Belt CB-12", status: "Pending", priority: "Medium", date: "2026-02-14", technician: "Sarah Johnson" },
    { id: "M-2026-003", equipment: "Pallet Jack PJ-89", status: "Completed", priority: "Low", date: "2026-02-13", technician: "Mike Chen" },
    { id: "M-2026-004", equipment: "Loading Dock LD-3", status: "In Progress", priority: "High", date: "2026-02-12", technician: "John Smith" },
    { id: "M-2026-005", equipment: "Warehouse Crane WC-01", status: "Scheduled", priority: "Medium", date: "2026-02-25", technician: "Sarah Johnson" },
  ];

  const upcomingSchedule = [
    { equipment: "Forklift FL-206", type: "Oil Change", date: "2026-02-24", time: "09:00 AM" },
    { equipment: "Conveyor Belt CB-14", type: "Belt Alignment", date: "2026-02-25", time: "02:00 PM" },
    { equipment: "Loading Dock LD-4", type: "Hydraulic Check", date: "2026-02-26", time: "10:30 AM" },
    { equipment: "Pallet Jack PJ-91", type: "Annual Inspection", date: "2026-02-27", time: "11:00 AM" },
  ];

  const technicianWorkload = [
    { name: "John Smith", active: 5, completed: 28, efficiency: 94 },
    { name: "Sarah Johnson", active: 4, completed: 32, efficiency: 96 },
    { name: "Mike Chen", active: 3, completed: 25, efficiency: 89 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Logistics Maintenance Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time overview of maintenance operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-semibold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">{stat.change}</p>
                    <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Maintenance by Type */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Maintenance by Type</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={maintenanceByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {maintenanceByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Weekly Trend */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Equipment Status and Top Maintenance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Equipment Status Overview */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Equipment Status</h2>
              <div className="space-y-4">
                {equipmentStatus.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value} units</span>
                    </div>
                    <Progress value={(item.value / 85) * 100} className="h-2" style={{ backgroundColor: item.color + '20' }} />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Equipment</span>
                  <span className="text-2xl font-semibold text-gray-900">85</span>
                </div>
              </div>
            </Card>

            {/* Top Equipment by Maintenance */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Equipment Health Status</h2>
              <div className="space-y-4">
                {topEquipmentMaintenance.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{item.equipment}</span>
                        <p className="text-xs text-gray-500">{item.count} maintenance records</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.status}%</span>
                    </div>
                    <Progress value={item.status} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Maintenance Activity</h2>
              <Link to="/maintenance" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentMaintenance.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.equipment}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.technician}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Completion Rate */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Completion Rate</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { month: "Jan", rate: 85 },
                  { month: "Feb", rate: 88 },
                  { month: "Mar", rate: 92 },
                  { month: "Apr", rate: 87 },
                  { month: "May", rate: 90 },
                  { month: "Jun", rate: 94 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="Completion Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Cost Analysis */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Maintenance Cost</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { month: "Jan", cost: 12500 },
                  { month: "Feb", cost: 15200 },
                  { month: "Mar", cost: 13800 },
                  { month: "Apr", cost: 16500 },
                  { month: "May", cost: 14200 },
                  { month: "Jun", cost: 15800 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#8b5cf6" name="Cost ($)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Scheduled Maintenance</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingSchedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Wrench className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.equipment}</p>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{item.date}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Technician Performance</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              {technicianWorkload.map((tech, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {tech.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tech.name}</p>
                        <p className="text-sm text-gray-600">{tech.active} active tasks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Efficiency</p>
                      <p className="text-xl font-semibold text-gray-900">{tech.efficiency}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Active Tasks</p>
                      <p className="font-medium text-gray-900">{tech.active}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Completed</p>
                      <p className="font-medium text-gray-900">{tech.completed}</p>
                    </div>
                  </div>
                  <Progress value={tech.efficiency} className="h-2 mt-4" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}