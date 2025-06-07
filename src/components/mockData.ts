
export const teams = [
  { id: '1', name: 'Software Team' },
  { id: '2', name: 'Production Team' },
  { id: '3', name: 'Design Team' },
  { id: '4', name: 'Hardware & Assembly' }
];

export const employees = [
  { id: '1', full_name: 'Alice Johnson', email: 'alice@company.com' },
  { id: '2', full_name: 'Bob Smith', email: 'bob@company.com' },
  { id: '3', full_name: 'Carol Davis', email: 'carol@company.com' },
  { id: '4', full_name: 'David Wilson', email: 'david@company.com' },
  { id: '5', full_name: 'Eva Brown', email: 'eva@company.com' },
  { id: '6', full_name: 'Frank Miller', email: 'frank@company.com' },
  { id: '7', full_name: 'Grace Lee', email: 'grace@company.com' },
  { id: '8', full_name: 'Henry Chen', email: 'henry@company.com' }
];

export const mockMeetings = [
  {
    id: 1,
    title: 'Sprint Planning Q1 2024',
    date: '2024-01-15',
    time: '10:00 AM',
    team: 'Software Team',
    attendees: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
    status: 'completed',
    agenda: ['Sprint goals review', 'Task assignments', 'Timeline discussion'],
    minutes: 'Discussed Q1 goals and assigned tasks. Sprint duration: 2 weeks. Next meeting: Jan 29.'
  },
  {
    id: 2,
    title: 'Production Review Meeting',
    date: '2024-01-18',
    time: '2:00 PM',
    team: 'Production Team',
    attendees: ['David Wilson', 'Eva Brown', 'Frank Miller'],
    status: 'scheduled',
    agenda: ['Production metrics', 'Quality control', 'Equipment maintenance'],
    minutes: ''
  },
  {
    id: 3,
    title: 'Design System Review',
    date: '2024-01-12',
    time: '11:00 AM',
    team: 'Design Team',
    attendees: ['Grace Lee', 'Henry Chen'],
    status: 'completed',
    agenda: ['Component library updates', 'Brand guidelines', 'Accessibility improvements'],
    minutes: 'Updated component library with new button variants. Discussed accessibility compliance for all components.'
  },
  {
    id: 4,
    title: 'Hardware Testing Protocol',
    date: '2024-01-20',
    time: '3:00 PM',
    team: 'Hardware & Assembly',
    attendees: ['Ian Parker', 'Julia Roberts'],
    status: 'scheduled',
    agenda: ['Testing procedures', 'Quality assurance', 'Documentation updates'],
    minutes: ''
  }
];
