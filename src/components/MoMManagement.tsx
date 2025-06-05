
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, FileText, Calendar, Users, Eye, Edit, Trash } from 'lucide-react';
import { MinutesOfMeeting, getMoMs, createMoM, updateMoM, deleteMoM } from '@/services/minutesOfMeeting';
import MoMForm from '@/components/MoMForm';
import { supabase } from '@/integrations/supabase/client';

const MoMManagement = () => {
  const [moms, setMoms] = useState<any[]>([]);
  const [filteredMoms, setFilteredMoms] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMom, setEditingMom] = useState<MinutesOfMeeting | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterMoms();
  }, [moms, searchTerm, filterTeam, filterType]);

  const loadData = async () => {
    try {
      const [momsData, teamsData, employeesData] = await Promise.all([
        getMoMs(),
        supabase.from('teams').select('*'),
        supabase.from('profiles').select('*')
      ]);

      setMoms(momsData || []);
      setTeams(teamsData.data || []);
      setEmployees(employeesData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filterMoms = () => {
    let filtered = moms;

    if (searchTerm) {
      filtered = filtered.filter(mom => 
        mom.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mom.agenda?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTeam !== 'all') {
      filtered = filtered.filter(mom => mom.team_id === filterTeam);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(mom => mom.meeting_type === filterType);
    }

    setFilteredMoms(filtered);
  };

  const handleCreateMom = async (momData: MinutesOfMeeting) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await createMoM({ ...momData, created_by: user.id });
      loadData();
    } catch (error) {
      console.error('Error creating MoM:', error);
    }
  };

  const handleUpdateMom = async (momData: MinutesOfMeeting) => {
    try {
      if (editingMom?.id) {
        await updateMoM(editingMom.id, momData);
        loadData();
        setEditingMom(undefined);
      }
    } catch (error) {
      console.error('Error updating MoM:', error);
    }
  };

  const handleDeleteMom = async (id: string) => {
    if (confirm('Are you sure you want to delete this Minutes of Meeting?')) {
      try {
        await deleteMoM(id);
        loadData();
      } catch (error) {
        console.error('Error deleting MoM:', error);
      }
    }
  };

  const getMeetingTypeColor = (type: string) => {
    const colors = {
      team: 'bg-blue-50 text-blue-700 border-blue-200',
      project: 'bg-green-50 text-green-700 border-green-200',
      one_on_one: 'bg-purple-50 text-purple-700 border-purple-200',
      client: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatMeetingType = (type: string) => {
    const types = {
      team: 'Team Meeting',
      project: 'Project Meeting',
      one_on_one: 'One-on-One',
      client: 'Client Meeting'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Minutes of Meeting</h2>
          <p className="text-gray-600">Manage meeting records and action items</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <Plus className="h-4 w-4 mr-2" />
          New MoM
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterTeam} onValueChange={setFilterTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="team">Team Meeting</SelectItem>
                <SelectItem value="project">Project Meeting</SelectItem>
                <SelectItem value="one_on_one">One-on-One</SelectItem>
                <SelectItem value="client">Client Meeting</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterTeam('all');
              setFilterType('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MoM List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMoms.map((mom) => (
          <Card key={mom.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {mom.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={getMeetingTypeColor(mom.meeting_type)}>
                      {formatMeetingType(mom.meeting_type)}
                    </Badge>
                    {mom.teams?.name && (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        {mom.teams.name}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setEditingMom(mom)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteMom(mom.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(mom.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{mom.participants?.length || 0} participants</span>
                </div>
              </div>

              {mom.agenda && (
                <div>
                  <p className="text-sm text-gray-600 line-clamp-2">{mom.agenda}</p>
                </div>
              )}

              {mom.action_items && mom.action_items.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Action Items:</p>
                  <p className="text-sm text-gray-600">{mom.action_items.length} tasks assigned</p>
                </div>
              )}

              <div className="text-xs text-gray-500">
                Created by: {mom.profiles?.full_name || mom.profiles?.email || 'Unknown'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMoms.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meeting records found</h3>
            <p className="text-gray-600 text-center mb-4">
              {searchTerm || filterTeam !== 'all' || filterType !== 'all' 
                ? 'No meetings match your current filters. Try adjusting your search criteria.'
                : 'Start by creating your first Minutes of Meeting to keep track of important discussions and decisions.'
              }
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First MoM
            </Button>
          </CardContent>
        </Card>
      )}

      {/* MoM Form Modal */}
      <MoMForm
        isOpen={isFormOpen || !!editingMom}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMom(undefined);
        }}
        onSubmit={editingMom ? handleUpdateMom : handleCreateMom}
        teams={teams}
        employees={employees}
        initialData={editingMom}
      />
    </div>
  );
};

export default MoMManagement;
