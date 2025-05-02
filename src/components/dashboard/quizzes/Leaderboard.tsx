
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Medal, Star, User } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatarUrl?: string;
  score: number;
  timeTaken: number; // in seconds
  isCurrentUser: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  quizTitle?: string;
  currentUserId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  entries, 
  quizTitle,
  currentUserId
}) => {
  // Sort entries by score (descending) and then by time taken (ascending)
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.timeTaken - b.timeTaken;
  });
  
  // Format time as minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Find current user's position
  const currentUserEntry = sortedEntries.find(entry => entry.userId === currentUserId);
  const currentUserPosition = currentUserEntry ? sortedEntries.indexOf(currentUserEntry) + 1 : null;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Leaderboard
            {quizTitle && <span className="ml-2 text-sm text-muted-foreground">- {quizTitle}</span>}
          </CardTitle>
          
          {currentUserPosition && (
            <Badge variant="outline" className="flex items-center gap-1">
              Your Rank: {currentUserPosition}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Student</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry, index) => (
              <TableRow 
                key={entry.userId}
                className={entry.isCurrentUser ? "bg-primary/5" : ""}
              >
                <TableCell className="font-medium">
                  {index === 0 ? (
                    <div className="flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-8 h-8">
                      <Trophy className="h-4 w-4" />
                    </div>
                  ) : index === 1 ? (
                    <div className="flex items-center justify-center bg-gray-100 text-gray-700 rounded-full w-8 h-8">
                      <Medal className="h-4 w-4" />
                    </div>
                  ) : index === 2 ? (
                    <div className="flex items-center justify-center bg-amber-100 text-amber-700 rounded-full w-8 h-8">
                      <Star className="h-4 w-4" />
                    </div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {entry.avatarUrl ? (
                      <img 
                        src={entry.avatarUrl} 
                        alt={entry.userName} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                    <span className={entry.isCurrentUser ? "font-medium" : ""}>
                      {entry.userName}
                      {entry.isCurrentUser && " (You)"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {entry.score}%
                </TableCell>
                <TableCell className="text-right">
                  {formatTime(entry.timeTaken)}
                </TableCell>
              </TableRow>
            ))}
            
            {entries.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No entries yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
