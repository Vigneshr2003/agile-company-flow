
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, Calendar, User, CheckSquare, Clock, AlertCircle } from 'lucide-react';

const StockManagement = () => {
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
      estimatedCost: '$250'
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
      estimatedCost: '$800'
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
      estimatedCost: '$600'
    },
    {
      id: 4,
      itemName: 'Safety Equipment',
      quantity: 10,
      reason: 'Monthly safety gear replenishment',
      requestedBy: 'Production Team',
      requestedDate: '2024-01-11',
      status: 'approved',
      priority: 'high',
      estimatedCost: '$450'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const updateRequestStatus = (id: number, newStatus: string) => {
    setStockRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const filteredRequests = filterStatus === 'all' 
    ? stockRequests 
    : stockRequests.filter(request => request.status === filterStatus);

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Management</h2>
          <p className="text-gray-600">Review and manage stock requests from all teams</p>
        </div>
        <div className="flex gap-2">
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
      </div>

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
                  ${stockRequests.reduce((sum, r) => sum + parseInt(r.estimatedCost.replace('$', '')), 0)}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={request.status === 'pending' ? '' : 'flex-1'}
                      onClick={() => setSelectedRequest(request)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{selectedRequest?.itemName}</DialogTitle>
                      <DialogDescription>
                        Stock request from {selectedRequest?.requestedBy}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Quantity</h4>
                          <p className="text-gray-600">{selectedRequest?.quantity}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Estimated Cost</h4>
                          <p className="text-gray-600">{selectedRequest?.estimatedCost}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                        <p className="text-gray-600">{selectedRequest?.reason}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                          <Badge variant="outline" className={getStatusColor(selectedRequest?.status || '')}>
                            {selectedRequest?.status}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Priority</h4>
                          <Badge variant="outline" className={getPriorityColor(selectedRequest?.priority || '')}>
                            {selectedRequest?.priority}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Request Date</h4>
                        <p className="text-gray-600">{selectedRequest?.requestedDate}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stock requests found</h3>
            <p className="text-gray-600 text-center">
              {filterStatus === 'all' 
                ? "No stock requests have been submitted yet." 
                : `No ${filterStatus} stock requests found.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockManagement;
