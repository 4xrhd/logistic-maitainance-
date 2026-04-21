import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Search, Filter } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "Operational" | "Under Maintenance" | "Out of Service" | "Reserved";
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo: string;
}

export function EquipmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [equipment] = useState<Equipment[]>([
    {
      id: "FL-205",
      name: "Forklift FL-205",
      type: "Forklift",
      location: "Warehouse A",
      status: "Under Maintenance",
      lastMaintenance: "2026-01-10",
      nextMaintenance: "2026-04-10",
      assignedTo: "John Smith",
    },
    {
      id: "CB-12",
      name: "Conveyor Belt CB-12",
      type: "Conveyor",
      location: "Warehouse B",
      status: "Operational",
      lastMaintenance: "2026-01-20",
      nextMaintenance: "2026-04-20",
      assignedTo: "Sarah Johnson",
    },
    {
      id: "PJ-89",
      name: "Pallet Jack PJ-89",
      type: "Pallet Jack",
      location: "Loading Dock 1",
      status: "Operational",
      lastMaintenance: "2026-02-01",
      nextMaintenance: "2026-05-01",
      assignedTo: "Mike Chen",
    },
    {
      id: "LD-3",
      name: "Loading Dock LD-3",
      type: "Loading Dock",
      location: "Main Entrance",
      status: "Under Maintenance",
      lastMaintenance: "2026-01-15",
      nextMaintenance: "2026-03-15",
      assignedTo: "John Smith",
    },
    {
      id: "WC-01",
      name: "Warehouse Crane WC-01",
      type: "Crane",
      location: "Warehouse C",
      status: "Operational",
      lastMaintenance: "2026-01-05",
      nextMaintenance: "2026-03-05",
      assignedTo: "Sarah Johnson",
    },
    {
      id: "FL-206",
      name: "Forklift FL-206",
      type: "Forklift",
      location: "Warehouse A",
      status: "Reserved",
      lastMaintenance: "2026-01-25",
      nextMaintenance: "2026-04-25",
      assignedTo: "Mike Chen",
    },
    {
      id: "PJ-90",
      name: "Pallet Jack PJ-90",
      type: "Pallet Jack",
      location: "Loading Dock 2",
      status: "Out of Service",
      lastMaintenance: "2025-12-10",
      nextMaintenance: "2026-03-10",
      assignedTo: "John Smith",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800";
      case "Under Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Service":
        return "bg-red-100 text-red-800";
      case "Reserved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEquipment = equipment.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || eq.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Equipment & Assets</h1>
            <p className="text-gray-600 mt-1">Track and manage logistics equipment</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Equipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Equipment</DialogTitle>
                <DialogDescription>
                  Register new equipment or asset to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="equipmentId">Equipment ID</Label>
                  <Input id="equipmentId" placeholder="e.g., FL-207" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipmentName">Equipment Name</Label>
                  <Input id="equipmentName" placeholder="e.g., Forklift FL-207" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipmentType">Type</Label>
                  <Select>
                    <SelectTrigger id="equipmentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forklift">Forklift</SelectItem>
                      <SelectItem value="conveyor">Conveyor</SelectItem>
                      <SelectItem value="pallet-jack">Pallet Jack</SelectItem>
                      <SelectItem value="crane">Crane</SelectItem>
                      <SelectItem value="loading-dock">Loading Dock</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Warehouse A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignTo">Assign To</Label>
                  <Select>
                    <SelectTrigger id="assignTo">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceSchedule">Next Maintenance</Label>
                  <Input id="maintenanceSchedule" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Equipment</Button>
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
              placeholder="Search by name, ID, type, or location..."
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
              <SelectItem value="Operational">Operational</SelectItem>
              <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
              <SelectItem value="Out of Service">Out of Service</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Equipment Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.map((eq) => (
                <tr key={eq.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {eq.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {eq.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {eq.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {eq.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary" className={getStatusColor(eq.status)}>
                      {eq.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {eq.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {eq.nextMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {eq.assignedTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
