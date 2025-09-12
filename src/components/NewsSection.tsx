import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Clock, AlertCircle, Info, CheckCircle, Play } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'urgent' | 'info' | 'maintenance' | 'success';
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Safety Protocol Implementation',
    summary: 'Updated safety procedures are now in effect for all depot operations. All staff must complete the new training module by end of week.',
    category: 'urgent',
    timestamp: '2024-01-15T09:30:00',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Maintenance Schedule Update',
    summary: 'Vehicle maintenance schedules have been updated. Check the maintenance portal for your assigned vehicles.',
    category: 'maintenance',
    timestamp: '2024-01-15T08:15:00',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'System Upgrade Completed Successfully',
    summary: 'The depot management system upgrade was completed overnight with no reported issues.',
    category: 'success',
    timestamp: '2024-01-14T22:45:00',
    priority: 'low'
  },
  {
    id: '4',
    title: 'Weather Alert - Heavy Rain Expected',
    summary: 'Severe weather conditions expected tomorrow. Review storm protocols and ensure all outdoor equipment is secured.',
    category: 'urgent',
    timestamp: '2024-01-14T16:20:00',
    priority: 'high'
  },
  {
    id: '5',
    title: 'New Training Videos Available',
    summary: 'Updated equipment training videos are now available in the training section. Completion required for certification renewal.',
    category: 'info',
    timestamp: '2024-01-14T14:30:00',
    priority: 'medium'
  }
];

const getCategoryIcon = (category: NewsItem['category']) => {
  const icons = {
    urgent: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    maintenance: <Clock className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />
  };
  return icons[category];
};

const getCategoryColor = (category: NewsItem['category']) => {
  const colors = {
    urgent: 'bg-depot-accent',
    info: 'bg-depot-primary',
    maintenance: 'bg-depot-warning',
    success: 'bg-depot-success'
  };
  return colors[category];
};

const getPriorityColor = (priority: NewsItem['priority']) => {
  const colors = {
    high: 'border-l-depot-accent',
    medium: 'border-l-depot-warning',
    low: 'border-l-depot-success'
  };
  return colors[priority];
};

const NewsSection: React.FC = () => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Newspaper className="w-6 h-6" />
            Latest News & Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsItems.map((item) => (
              <div 
                key={item.id} 
                className={`p-4 bg-depot-surface rounded-lg border-l-4 ${getPriorityColor(item.priority)} transition-all hover:bg-depot-surface-elevated`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`${getCategoryColor(item.category)} text-white flex items-center gap-1`}
                    >
                      {getCategoryIcon(item.category)}
                      {item.category.toUpperCase()}
                    </Badge>
                    {item.priority === 'high' && (
                      <Badge variant="destructive" className="animate-pulse">
                        HIGH PRIORITY
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(item.timestamp)}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>

          {/* RSRG Video within News card */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">RSRG Video</h3>
            <div className="bg-gradient-to-r from-depot-primary/20 to-depot-accent/20 rounded-lg p-6 relative">
              <div className="flex items-center justify-center h-24 mb-4">
                <Play className="w-12 h-12 text-foreground" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-foreground mb-2">CORK LINE</h4>
                <p className="text-sm text-muted-foreground">Rehabilitation Project</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsSection;