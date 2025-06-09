
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';

const EmptyTaskState = () => {
  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
        <CheckSquare className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-4" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks assigned</h3>
        <p className="text-gray-600 text-center text-sm sm:text-base break-words">
          You don't have any tasks assigned yet. Check back later or contact your admin.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyTaskState;
