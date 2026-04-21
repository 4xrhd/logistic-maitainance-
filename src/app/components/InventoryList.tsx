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
import { Plus, Search, Filter, AlertCircle } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  location: string;
  lastRestocked: string;
  supplier: string;
}

export function InventoryList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [inventory] = useState<InventoryItem[]>([
    {
      id: "INV-001",
      name: "Hydraulic Oil 20L",
      category: "Fluids",
      quantity: 25,
      unit: "Bottles",
      minStock: 10,
      location: "Storage Room A",
      lastRestocked: "2026-02-01",
      supplier: "Industrial Supplies Co.",
    },
    {
      id: "INV-002",
      name: "Safety Vests",
      category: "Safety Equipment",
      quantity: 45,
      unit: "Units",
      minStock: 30,
      location: "Safety Station",
      lastRestocked: "2026-01-28",
      supplier: "SafeWork Equipment",
    },
    {
      id: "INV-003",
      name: "Forklift Tires",
      category: "Parts",
      quantity: 8,
      unit: "Units",
      minStock: 6,
      location: "Parts Room",
      lastRestocked: "2026-01-20",
      supplier: "Heavy Equipment Parts",
    },
    {
      id: "INV-004",
      name: "Hand Tools Set",
      category: "Tools",
      quantity: 5,
      unit: "Sets",
      minStock: 3,
      location: "Tool Shed",
      lastRestocked: "2026-02-10",
      supplier: "Pro Tools Direct",
    },
    {
      id: "INV-005",
      name: "Pallet Wrap Film",
      category: "Packaging",
      quantity: 32,
      unit: "Rolls",
      minStock: 20,
      location: "Packaging Station",
      lastRestocked: "2026-02-05",
      supplier: "Packaging Solutions Ltd.",
    },
    {
      id: "INV-006",
      name: "LED Work Lights",
      category: "Equipment",
      quantity: 3,
      unit: "Units",
      minStock: 5,
      location: "Equipment Room",
      lastRestocked: "2026-01-15",
      supplier: "Lighting Warehouse",
    },
    {
      id: "INV-007",
      name: "Conveyor Belt Lubricant",
      category: "Fluids",
      quantity: 18,
      unit: "Bottles",
      minStock: 15,
      location: "Storage Room B",
      lastRestocked: "2026-02-08",
      supplier: "Industrial Supplies Co.",
    },
    {
      id: "INV-008",
      name: "First Aid Kits",
      category: "Safety Equipment",
      quantity: 12,
      unit: "Kits",
      minStock: 10,
      location: "Safety Station",
      lastRestocked: "2026-01-25",
      supplier: "Medical Supply Corp.",
    },
  ]);

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity < minStock) {
      return { status: "Low Stock", color: "bg-red-100 text-red-800" };
    } else if (quantity < minStock * 1.5) {
      return { status: "Adequate", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { status: "Good Stock", color: "bg-green-100 text-green-800" };
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterCategory === "all" || item.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const lowStockItems = inventory.filter((item) => item.quantity < item.minStock);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Track supplies, parts, and equipment inventory</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Inventory Item</DialogTitle>
                <DialogDescription>
                  Register a new item to the inventory system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemCategory">Category</Label>
                  <Select>
                    <SelectTrigger id="itemCategory">
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
                    <Label htmlFor="currentQuantity">Quantity</Label>
                    <Input id="currentQuantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemUnit">Unit</Label>
                    <Select>
                      <SelectTrigger id="itemUnit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                        <SelectItem value="rolls">Rolls</SelectItem>
                        <SelectItem value="sets">Sets</SelectItem>
                        <SelectItem value="kits">Kits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                  <Input id="minStockLevel" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemLocation">Storage Location</Label>
                  <Input id="itemLocation" placeholder="e.g., Storage Room A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemSupplier">Supplier</Label>
                  <Input id="itemSupplier" placeholder="Enter supplier name" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900 mb-1">Low Stock Alert</h3>
              <p className="text-sm text-red-700">
                {lowStockItems.length} item{lowStockItems.length > 1 ? "s" : ""} below minimum stock level
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, or supplier..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Parts">Parts</SelectItem>
              <SelectItem value="Fluids">Fluids</SelectItem>
              <SelectItem value="Tools">Tools</SelectItem>
              <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
              <SelectItem value="Packaging">Packaging</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Restocked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.minStock);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.minStock} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" className={stockStatus.color}>
                        {stockStatus.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.lastRestocked}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.supplier}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
