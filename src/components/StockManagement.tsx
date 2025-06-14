import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Plus, Calendar, User, CheckSquare, Clock, AlertCircle, Warehouse, TrendingDown } from 'lucide-react';

interface StockManagementProps {
  selectedTeam?: string;
}

const StockManagement = ({ selectedTeam = 'all' }: StockManagementProps) => {
  const [activeTab, setActiveTab] = useState('requests');
  
  // Stock requests from teams
  const [stocks, setStocks] = useState([
    {
      id: 1,
      itemName: 'Laptop Chargers',
      quantity: 5,
      reason: 'Replacement for damaged chargers',
      requestedBy: 'Software Team',
      requestedDate: '2024-01-12',
      status: 'pending',
      priority: 'medium',
      estimatedCost: '₹250'
    },
    {
      id: 2,
      itemName: 'Circuit Boards',
      quantity: 20,
      reason: 'Production line expansion',
      requestedBy: 'Hardware & Assembly',
      requestedDate: '2024-01-10',
      status: 'approved',
      priority: 'high',
      estimatedCost: '₹800'
    },
    {
      id: 3,
      itemName: 'Design Software License',
      quantity: 1,
      reason: 'Annual renewal for Adobe Creative Suite',
      requestedBy: 'Design Team',
      requestedDate: '2024-01-08',
      status: 'pending',
      priority: 'low',
      estimatedCost: '₹600'
    },
    {
      id: 4,
      itemName: 'Safety Equipment',
      quantity: 10,
      reason: 'Monthly safety gear replacement',
      requestedBy: 'Production Team',
      requestedDate: '2024-01-14',
      status: 'approved',
      priority: 'high',
      estimatedCost: '₹400'
    }
  ]);

  // Current stock inventory with real-time updates
  const [stockInventory, setStockInventory] = useState([
    { id: 1, itemName: 'Laptop Chargers', currentStock: 15, minStock: 5, maxStock: 25, status: 'good', lastUpdated: '2024-01-15', location: 'Warehouse A' },
    { id: 2, itemName: 'Circuit Boards', currentStock: 3, minStock: 10, maxStock: 50, status: 'critical', lastUpdated: '2024-01-14', location: 'Warehouse B' },
    { id: 3, itemName: 'Safety Equipment', currentStock: 2, minStock: 8, maxStock: 20, status: 'critical', lastUpdated: '2024-01-13', location: 'Warehouse A' },
    { id: 4, itemName: 'Keyboards and Mice', currentStock: 12, minStock: 5, maxStock: 15, status: 'good', lastUpdated: '2024-01-12', location: 'Warehouse C' },
    { id: 5, itemName: 'Monitors', currentStock: 8, minStock: 3, maxStock: 12, status: 'good', lastUpdated: '2024-01-11', location: 'Warehouse A' },
  ]);

  // Stock usage tracking by teams
  const [stockUsage, setStockUsage] = useState([
    { id: 1, teamName: 'Software Team', itemName: 'Laptop Chargers', usedQuantity: 3, usageDate: '2024-01-15', updatedBy: 'John Doe', remainingStock: 15 },
    { id: 2, teamName: 'Production Team', itemName: 'Safety Equipment', usedQuantity: 5, usageDate: '2024-01-14', updatedBy: 'Jane Smith', remainingStock: 2 },
    { id: 3, teamName: 'Hardware & Assembly', itemName: 'Circuit Boards', usedQuantity: 8, usageDate: '2024-01-13', updatedBy: 'Mike Johnson', remainingStock: 3 },
    { id: 4, teamName: 'Design Team', itemName: 'Keyboards and Mice', usedQuantity: 2, usageDate: '2024-01-12', updatedBy: 'Sarah Wilson', remainingStock: 12 },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const updateRequestStatus = (id: number, newStatus: string) => {
    setStocks(prev => prev.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const getStockStatus = (current: number, min: number) => {
    if (current <= min * 0.5) return 'critical';
    if (current <= min) return 'low';
    return 'good';
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'low': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'good': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckSquare className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  // Filter data based on selected team
  const filteredRequests = stocks.filter(request => {
    const matchesTeam = selectedTeam === 'all' || request.requestedBy.toLowerCase().includes(selectedTeam.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesTeam && matchesStatus;
  });

  const filteredUsage = stockUsage.filter(usage => 
    selectedTeam === 'all' || usage.teamName.toLowerCase().includes(selectedTeam.toLowerCase())
  );

  const criticalItems = stockInventory.filter(item => item.status === 'critical').length;
  const lowStockItems = stockInventory.filter(item => item.status === 'low').length;

  // Assume "tasks" is "stocks" for stock requests; if not, change as appropriate.
  // Explicitly group by status (pending > approved > rejected)
  const pendingStocks = stocks.filter(s => s.status === 'pending');
  const approvedStocks = stocks.filter(s => s.status === 'approved');
  const rejectedStocks = stocks.filter(s => s.status === 'rejected');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Stock Management</h2>
          <p className="text-gray-600 text-sm md:text-base">Manage stock requests and inventory levels</p>
          {selectedTeam !== 'all' && (
            <p className="text-sm text-blue-600 mt-1">Filtered by: {selectedTeam}</p>
          )}
        </div>
      </div>

      {/* Critical Stock Alerts */}
      {criticalItems > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 font-medium text-sm md:text-base">
                🚨 Critical Stock Alert: {criticalItems} item(s) need immediate restocking
              </p>
              <p className="text-red-700 text-xs md:text-sm mt-1">
                Items at critical levels: {stockInventory.filter(item => item.status === 'critical').map(item => item.itemName).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm min-w-max">
            <TabsTrigger value="requests" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Stock Requests
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              In Stock
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Usage Tracking
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Stock Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Pending Requests</p>
                    <p className="text-xl md:text-2xl font-bold text-orange-900">
                      {filteredRequests.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Approved</p>
                    <p className="text-xl md:text-2xl font-bold text-green-900">
                      {filteredRequests.filter(r => r.status === 'approved').length}
                    </p>
                  </div>
                  <CheckSquare className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Value</p>
                    <p className="text-xl md:text-2xl font-bold text-blue-900">
                      ₹{filteredRequests.reduce((sum, r) => sum + parseInt(r.estimatedCost.replace('₹', '')), 0)}
                    </p>
                  </div>
                  <Package className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex justify-end">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stock Requests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {request.itemName}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">
                        Quantity: {request.quantity}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Request Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{request.requestedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{new Date(request.requestedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-2">{request.reason}</p>
                  </div>

                  {/* Status and Cost */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status}</span>
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{request.estimatedCost}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300 text-xs"
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-xs"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* In Stock Tab */}
        <TabsContent value="inventory" className="space-y-6">
          {/* Inventory Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <p className="text-blue-600 text-sm font-medium">Total Items</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-900">{stockInventory.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <p className="text-green-600 text-sm font-medium">Good Stock</p>
                  <p className="text-xl md:text-2xl font-bold text-green-900">
                    {stockInventory.filter(item => item.status === 'good').length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <p className="text-orange-600 text-sm font-medium">Low Stock</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-900">{lowStockItems}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <p className="text-red-600 text-sm font-medium">Critical</p>
                  <p className="text-xl md:text-2xl font-bold text-red-900">{criticalItems}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Table - Responsive */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-blue-600" />
                Current Stock Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Item Name</TableHead>
                      <TableHead className="text-center">Current</TableHead>
                      <TableHead className="text-center">Min</TableHead>
                      <TableHead className="text-center">Max</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="min-w-[120px]">Location</TableHead>
                      <TableHead className="min-w-[100px]">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.itemName}</TableCell>
                        <TableCell className="text-center">{item.currentStock}</TableCell>
                        <TableCell className="text-center">{item.minStock}</TableCell>
                        <TableCell className="text-center">{item.maxStock}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={getStockStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(item.lastUpdated).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Tracking Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                Real-time Stock Usage Tracking
              </CardTitle>
              <CardDescription>Monitor how teams update their stock usage in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsage.map((usage) => (
                  <div key={usage.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{usage.itemName}</h4>
                          <p className="text-sm text-gray-600 truncate">{usage.teamName}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            -{usage.usedQuantity} units
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            {usage.remainingStock} left
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-gray-600">Updated by {usage.updatedBy}</p>
                      <p className="text-xs text-gray-500">{new Date(usage.usageDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockManagement;
