import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

interface MaintenanceRequest {
  id: string;
  equipmentId: string;
  equipment?: { name: string };
  type: string;
  priority: string;
  status: string;
  assignedTo?: { name: string };
  createdDate: string;
  dueDate: string;
  description: string;
}

export function MaintenanceList() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);

  const [formData, setFormData] = useState({
    id: "",
    equipmentId: "",
    type: "",
    priority: "",
    dueDate: "",
    description: ""
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await api.get<MaintenanceRequest[]>('/maintenance', token!);
      setMaintenanceRequests(data);
    } catch (error) {
      console.error("Failed to fetch maintenance requests", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleCreate = async () => {
    try {
      await api.post('/maintenance', formData, token!);
      setIsDialogOpen(false);
      fetchData();
      setFormData({
        id: "",
        equipmentId: "",
        type: "",
        priority: "",
        dueDate: "",
        description: ""
      });
    } catch (error) {
      console.error("Failed to create request", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = maintenanceRequests.filter((request) => {
    const equipmentName = request.equipment?.name || "";
    const matchesSearch =
      equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.assignedTo?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Maintenance Requests</h1>
            <p className="text-gray-600 mt-1">Manage equipment maintenance and repairs</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Maintenance Request</DialogTitle>
                <DialogDescription>
                  Submit a new maintenance request for equipment or facility.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Request ID</Label>
                  <Input 
                    id="id" 
                    placeholder="e.g. MR-2024-001" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipmentId">Equipment ID</Label>
                  <Input 
                    id="equipmentId" 
                    placeholder="Enter equipment ID (e.g. EQ-001)" 
                    value={formData.equipmentId}
                    onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Maintenance Type</Label>
                  <Select onValueChange={(val) => setFormData({...formData, type: val})}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preventive">Preventive</SelectItem>
                      <SelectItem value="Corrective">Corrective</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select onValueChange={(val) => setFormData({...formData, priority: val})}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the maintenance needed..." 
                    rows={3} 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>Create Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by equipment, ID, or technician..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Maintenance Requests Table */}
      <Card>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No maintenance requests found.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {request.equipment?.name || request.equipmentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {request.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {request.assignedTo?.name || "Unassigned"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(request.dueDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
