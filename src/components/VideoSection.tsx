import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DepotButton } from '@/components/ui/depot-button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, User } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'safety' | 'training' | 'maintenance' | 'procedure';
  instructor: string;
  thumbnail: string;
  views: number;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Vehicle Pre-Inspection Safety Protocol',
    description: 'Complete guide to conducting thorough vehicle safety inspections before operation.',
    duration: '15:32',
    category: 'safety',
    instructor: 'Sarah Mitchell',
    thumbnail: '/api/placeholder/320/180',
    views: 234
  },
  {
    id: '2',
    title: 'Emergency Response Procedures',
    description: 'Step-by-step emergency response protocols for various scenarios in depot operations.',
    duration: '12:45',
    category: 'safety',
    instructor: 'Mike Johnson',
    thumbnail: '/api/placeholder/320/180',
    views: 189
  },
  {
    id: '3',
    title: 'Equipment Maintenance Best Practices',
    description: 'Learn the essential maintenance procedures to keep equipment running efficiently.',
    duration: '18:20',
    category: 'maintenance',
    instructor: 'David Chen',
    thumbnail: '/api/placeholder/320/180',
    views: 156
  },
  {
    id: '4',
    title: 'New Employee Induction Process',
    description: 'Comprehensive induction training for new depot employees covering all essential procedures.',
    duration: '25:15',
    category: 'training',
    instructor: 'Lisa Rodriguez',
    thumbnail: '/api/placeholder/320/180',
    views: 298
  },
  {
    id: '5',
    title: 'Digital Systems Navigation',
    description: 'How to effectively use the depot management systems and digital tools.',
    duration: '10:30',
    category: 'procedure',
    instructor: 'Alex Thompson',
    thumbnail: '/api/placeholder/320/180',
    views: 145
  },
  {
    id: '6',
    title: 'Incident Reporting Procedures',
    description: 'Proper procedures for documenting and reporting incidents in the workplace.',
    duration: '8:45',
    category: 'procedure',
    instructor: 'Jennifer Wilson',
    thumbnail: '/api/placeholder/320/180',
    views: 203
  }
];

const getCategoryColor = (category: Video['category']) => {
  const colors = {
    safety: 'bg-depot-accent',
    training: 'bg-depot-success',
    maintenance: 'bg-depot-warning',
    procedure: 'bg-depot-primary'
  };
  return colors[category];
};

const VideoSection: React.FC = () => {
  const handlePlayVideo = (video: Video) => {
    // In a real app, this would open the video player
    console.log('Playing video:', video.title);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <PlayCircle className="w-6 h-6" />
            Training Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-depot-surface rounded-lg overflow-hidden border border-border hover:border-depot-primary transition-colors">
                <div className="relative aspect-video bg-depot-surface-elevated">
                  {/* Video thumbnail placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-depot-surface to-depot-surface-elevated">
                    <PlayCircle className="w-16 h-16 text-depot-primary" />
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getCategoryColor(video.category)} text-white`}>
                      {video.category.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg leading-tight">{video.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {video.instructor}
                    </div>
                    <div>{video.views} views</div>
                  </div>
                  
                  <DepotButton 
                    variant="default"
                    size="default"
                    onClick={() => handlePlayVideo(video)}
                    className="w-full flex items-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Watch Video
                  </DepotButton>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSection;