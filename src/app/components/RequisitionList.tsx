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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Search, Filter } from "lucide-react";

interface Requisition {
  id: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  status: "Pending" | "Approved" | "Ordered" | "Received" | "Rejected";
  requestedBy: string;
  requestDate: string;
  estimatedCost: string;
}

export function RequisitionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [requisitions] = useState<Requisition[]>([
    {
      id: "REQ-2026-045",
      item: "Hydraulic Oil (20L)",
      category: "Fluids",
      quantity: 5,
      unit: "Bottles",
      status: "Approved",
      requestedBy: "John Smith",
      requestDate: "2026-02-15",
      estimatedCost: "$450",
    },
    {
      id: "REQ-2026-046",
      item: "Safety Vests",
      category: "Safety Equipment",
      quantity: 20,
      unit: "Units",
      status: "Pending",
      requestedBy: "Sarah Johnson",
      requestDate: "2026-02-14",
      estimatedCost: "$300",
    },
    {
      id: "REQ-2026-047",
      item: "Forklift Tires",
      category: "Parts",
      quantity: 4,
      unit: "Units",
      status: "Ordered",
      requestedBy: "Mike Chen",
      requestDate: "2026-02-13",
      estimatedCost: "$1,200",
    },
    {
      id: "REQ-2026-048",
      item: "Hand Tools Set",
      category: "Tools",
      quantity: 2,
      unit: "Sets",
      status: "Approved",
      requestedBy: "John Smith",
      requestDate: "2026-02-12",
      estimatedCost: "$280",
    },
    {
      id: "REQ-2026-049",
      item: "Pallet Wrap Film",
      category: "Packaging",
      quantity: 10,
      unit: "Rolls",
      status: "Received",
      requestedBy: "Sarah Johnson",
      requestDate: "2026-02-10",
      estimatedCost: "$150",
    },
    {
      id: "REQ-2026-050",
      item: "LED Work Lights",
      category: "Equipment",
      quantity: 8,
      unit: "Units",
      status: "Pending",
      requestedBy: "Mike Chen",
      requestDate: "2026-02-09",
      estimatedCost: "$640",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Ordered":
        return "bg-blue-100 text-blue-800";
      case "Received":
        return "bg-purple-100 text-purple-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequisitions = requisitions.filter((req) => {
    const matchesSearch =
      req.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || req.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Requisitions</h1>
            <p className="text-gray-600 mt-1">Manage supply and equipment requisitions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Requisition
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Requisition</DialogTitle>
                <DialogDescription>
                  Submit a new requisition for supplies or equipment.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="item">Item Name</Label>
                  <Input id="item" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parts">Parts</SelectItem>
                      <SelectItem value="fluids">Fluids</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="safety">Safety Equipment</SelectItem>
                      <SelectItem value="packaging">Packaging</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                        <SelectItem value="rolls">Rolls</SelectItem>
                        <SelectItem value="sets">Sets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost</Label>
                  <Input id="estimatedCost" type="text" placeholder="$0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="justification">Justification</Label>
                  <Textarea id="justification" placeholder="Explain why this item is needed..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Submit Requisition</Button>
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
              placeholder="Search by item, ID, or requester..."
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
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Ordered">Ordered</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Requisitions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requisition ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequisitions.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {req.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.quantity} {req.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary" className={getStatusColor(req.status)}>
                      {req.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.requestedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.estimatedCost}
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
