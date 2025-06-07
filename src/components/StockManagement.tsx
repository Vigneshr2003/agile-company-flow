
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Plus, Calendar, User, CheckSquare, Clock, AlertCircle, Warehouse, TrendingDown } from 'lucide-react';

const StockManagement = () => {
  const [activeTab, setActiveTab] = useState('requests');
  
  // Stock requests from teams
  const [stockRequests, setStockRequests] = useState([
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
    }
  ]);

  // Current stock inventory
  const [stockInventory, setStockInventory] = useState([
    { id: 1, itemName: 'Laptop Chargers', currentStock: 15, minStock: 5, maxStock: 25, status: 'good', lastUpdated: '2024-01-15' },
    { id: 2, itemName: 'Circuit Boards', currentStock: 3, minStock: 10, maxStock: 50, status: 'low', lastUpdated: '2024-01-14' },
    { id: 3, itemName: 'Safety Equipment', currentStock: 12, minStock: 8, maxStock: 20, status: 'good', lastUpdated: '2024-01-13' },
    { id: 4, itemName: 'Keyboards and Mice', currentStock: 2, minStock: 5, maxStock: 15, status: 'critical', lastUpdated: '2024-01-12' },
    { id: 5, itemName: 'Monitors', currentStock: 8, minStock: 3, maxStock: 12, status: 'good', lastUpdated: '2024-01-11' },
  ]);

  // Stock usage by teams
  const [stockUsage, setStockUsage] = useState([
    { id: 1, teamName: 'Software Team', itemName: 'Laptop Chargers', usedQuantity: 3, usageDate: '2024-01-15', updatedBy: 'John Doe' },
    { id: 2, teamName: 'Production Team', itemName: 'Safety Equipment', usedQuantity: 5, usageDate: '2024-01-14', updatedBy: 'Jane Smith' },
    { id: 3, teamName: 'Hardware & Assembly', itemName: 'Circuit Boards', usedQuantity: 8, usageDate: '2024-01-13', updatedBy: 'Mike Johnson' },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const updateRequestStatus = (id: number, newStatus: string) => {
    setStockRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const getStockStatus = (current: number, min: number, max: number) => {
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

  const filteredRequests = filterStatus === 'all' 
    ? stockRequests 
    : stockRequests.filter(request => request.status === filterStatus);

  const criticalItems = stockInventory.filter(item => item.status === 'critical').length;
  const lowStockItems = stockInventory.filter(item => item.status === 'low').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Management</h2>
          <p className="text-gray-600">Manage stock requests and inventory levels</p>
        </div>
      </div>

      {/* Alert for critical stock */}
      {criticalItems > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 font-medium">
              Critical Stock Alert: {criticalItems} item(s) need immediate restocking
            </p>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm">
          <TabsTrigger value="requests" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Stock Requests
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            In Stock
          </TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Usage Tracking
          </TabsTrigger>
        </TabsList>

        {/* Stock Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Pending Requests</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {stockRequests.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Approved Requests</p>
                    <p className="text-2xl font-bold text-green-900">
                      {stockRequests.filter(r => r.status === 'approved').length}
                    </p>
                  </div>
                  <CheckSquare className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Value</p>
                    <p className="text-2xl font-bold text-blue-900">
                      ₹{stockRequests.reduce((sum, r) => sum + parseInt(r.estimatedCost.replace('₹', '')), 0)}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex justify-end">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
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

          {/* Stock Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      <User className="h-4 w-4" />
                      <span>{request.requestedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
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
                          className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
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

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          {/* Inventory Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Items</p>
                    <p className="text-2xl font-bold text-blue-900">{stockInventory.length}</p>
                  </div>
                  <Warehouse className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Good Stock</p>
                    <p className="text-2xl font-bold text-green-900">
                      {stockInventory.filter(item => item.status === 'good').length}
                    </p>
                  </div>
                  <CheckSquare className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Low Stock</p>
                    <p className="text-2xl font-bold text-orange-900">{lowStockItems}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 text-sm font-medium">Critical</p>
                    <p className="text-2xl font-bold text-red-900">{criticalItems}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {stockInventory.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {item.itemName}
                    </CardTitle>
                    <Badge variant="outline" className={getStockStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stock Levels */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Stock:</span>
                      <span className="font-medium">{item.currentStock}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Min Stock:</span>
                      <span className="font-medium">{item.minStock}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Max Stock:</span>
                      <span className="font-medium">{item.maxStock}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Stock Level</span>
                      <span>{Math.round((item.currentStock / item.maxStock) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          item.status === 'critical' ? 'bg-red-500' :
                          item.status === 'low' ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="text-xs text-gray-500">
                    Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Usage Tracking Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Stock Usage</CardTitle>
              <CardDescription>Track how teams are using approved stock items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockUsage.map((usage) => (
                  <div key={usage.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{usage.itemName}</h4>
                          <p className="text-sm text-gray-600">{usage.teamName}</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          -{usage.usedQuantity} units
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
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
