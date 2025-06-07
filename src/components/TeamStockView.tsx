import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Plus, Calendar, Clock, CheckSquare, AlertCircle, DollarSign, Minus } from 'lucide-react';

const TeamStockView = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [stockRequests, setStockRequests] = useState([
    {
      id: 1,
      itemName: 'Laptop Chargers',
      quantity: 5,
      reason: 'Replacement for damaged chargers',
      requestedDate: '2024-01-12',
      status: 'pending',
      priority: 'medium',
      estimatedCost: '₹250'
    },
    {
      id: 2,
      itemName: 'External Monitors',
      quantity: 3,
      reason: 'New workstation setup for developers',
      requestedDate: '2024-01-08',
      status: 'approved',
      priority: 'high',
      estimatedCost: '₹900'
    },
    {
      id: 3,
      itemName: 'Keyboards and Mice',
      quantity: 8,
      reason: 'Ergonomic replacements for team',
      requestedDate: '2024-01-10',
      status: 'pending',
      priority: 'low',
      estimatedCost: '₹320'
    }
  ]);

  const [teamStock, setTeamStock] = useState([
    { id: 1, itemName: 'Laptop Chargers', allocatedStock: 10, usedStock: 3, remainingStock: 7 },
    { id: 2, itemName: 'External Monitors', allocatedStock: 5, usedStock: 2, remainingStock: 3 },
    { id: 3, itemName: 'Safety Equipment', allocatedStock: 8, usedStock: 5, remainingStock: 3 },
  ]);

  const [stockUsageHistory, setStockUsageHistory] = useState([
    { id: 1, itemName: 'Laptop Chargers', usedQuantity: 2, date: '2024-01-15', reason: 'Developer workstation setup' },
    { id: 2, itemName: 'External Monitors', usedQuantity: 1, date: '2024-01-14', reason: 'New employee setup' },
    { id: 3, itemName: 'Safety Equipment', usedQuantity: 3, date: '2024-01-13', reason: 'Monthly replacement' },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<any>(null);
  
  const [newRequest, setNewRequest] = useState({
    itemName: '',
    quantity: '',
    reason: '',
    priority: 'medium',
    estimatedCost: ''
  });

  const [usageUpdate, setUsageUpdate] = useState({
    quantity: '',
    reason: ''
  });

  const handleCreateRequest = () => {
    const request = {
      id: stockRequests.length + 1,
      ...newRequest,
      quantity: parseInt(newRequest.quantity),
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setStockRequests([...stockRequests, request]);
    setNewRequest({ itemName: '', quantity: '', reason: '', priority: 'medium', estimatedCost: '' });
    setIsCreateModalOpen(false);
  };

  const handleUpdateUsage = () => {
    const quantity = parseInt(usageUpdate.quantity);
    if (selectedStockItem && quantity > 0 && quantity <= selectedStockItem.remainingStock) {
      // Update team stock
      setTeamStock(prev => prev.map(item => 
        item.id === selectedStockItem.id 
          ? { 
              ...item, 
              usedStock: item.usedStock + quantity, 
              remainingStock: item.remainingStock - quantity 
            }
          : item
      ));

      // Add to usage history
      const newUsage = {
        id: stockUsageHistory.length + 1,
        itemName: selectedStockItem.itemName,
        usedQuantity: quantity,
        date: new Date().toISOString().split('T')[0],
        reason: usageUpdate.reason
      };
      setStockUsageHistory([newUsage, ...stockUsageHistory]);

      setUsageUpdate({ quantity: '', reason: '' });
      setIsUsageModalOpen(false);
      setSelectedStockItem(null);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Stock Management</h2>
          <p className="text-gray-600 text-sm md:text-base">Manage your team's stock requests and usage</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Stock Request</DialogTitle>
              <DialogDescription>
                Request new stock or equipment for your team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="e.g., Laptop Chargers"
                  value={newRequest.itemName}
                  onChange={(e) => setNewRequest({ ...newRequest, itemName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 5"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={newRequest.priority} 
                    onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Estimated Cost</Label>
                <Input
                  id="estimatedCost"
                  placeholder="e.g., ₹250"
                  value={newRequest.estimatedCost}
                  onChange={(e) => setNewRequest({ ...newRequest, estimatedCost: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why this stock is needed..."
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRequest}>Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm min-w-max">
            <TabsTrigger value="requests" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              My Requests
            </TabsTrigger>
            <TabsTrigger value="allocated" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Allocated Stock
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Usage History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Stock Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Pending</p>
                    <p className="text-xl md:text-2xl font-bold text-orange-900">
                      {stockRequests.filter(r => r.status === 'pending').length}
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
                      {stockRequests.filter(r => r.status === 'approved').length}
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
                      ₹{stockRequests.reduce((sum, r) => sum + parseInt(r.estimatedCost.replace('₹', '')), 0)}
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Requests List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {stockRequests.map((request) => (
              <Card key={request.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {request.itemName}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">
                        Quantity: {request.quantity} • {request.estimatedCost}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Request Details */}
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-2">{request.reason}</p>
                  </div>

                  {/* Date and Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Requested: {new Date(request.requestedDate).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </Badge>
                  </div>

                  {/* Status Messages */}
                  {request.status === 'pending' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-orange-700 text-sm">
                        Your request is being reviewed by the Super Admin.
                      </p>
                    </div>
                  )}
                  {request.status === 'approved' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-700 text-sm">
                        Request approved! Items will be allocated to your team soon.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Allocated Stock Tab */}
        <TabsContent value="allocated" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {teamStock.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">{item.itemName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stock Information */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Allocated:</span>
                      <span className="font-medium">{item.allocatedStock}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Used:</span>
                      <span className="font-medium text-red-600">{item.usedStock}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-medium text-green-600">{item.remainingStock}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Usage</span>
                      <span>{Math.round((item.usedStock / item.allocatedStock) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(item.usedStock / item.allocatedStock) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Update Usage Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setSelectedStockItem(item);
                      setIsUsageModalOpen(true);
                    }}
                    disabled={item.remainingStock <= 0}
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Update Usage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Update Modal */}
          <Dialog open={isUsageModalOpen} onOpenChange={setIsUsageModalOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Update Stock Usage</DialogTitle>
                <DialogDescription>
                  Update how much stock your team has used for {selectedStockItem?.itemName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="usageQuantity">Quantity Used</Label>
                  <Input
                    id="usageQuantity"
                    type="number"
                    placeholder="Enter quantity used"
                    value={usageUpdate.quantity}
                    onChange={(e) => setUsageUpdate({ ...usageUpdate, quantity: e.target.value })}
                    max={selectedStockItem?.remainingStock || 0}
                  />
                  <p className="text-xs text-gray-500">
                    Available: {selectedStockItem?.remainingStock || 0} units
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usageReason">Reason for Usage</Label>
                  <Textarea
                    id="usageReason"
                    placeholder="Explain why the stock was used..."
                    value={usageUpdate.reason}
                    onChange={(e) => setUsageUpdate({ ...usageUpdate, reason: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUsageModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateUsage}>Update Usage</Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Usage History Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Stock Usage History</CardTitle>
              <CardDescription>Track your team's stock usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockUsageHistory.map((usage) => (
                  <div key={usage.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{usage.itemName}</h4>
                          <p className="text-sm text-gray-600">{usage.reason}</p>
                        </div>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                          -{usage.usedQuantity} units
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-gray-600">{new Date(usage.date).toLocaleDateString()}</p>
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

export default TeamStockView;
