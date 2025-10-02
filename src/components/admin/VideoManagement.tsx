import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Video,
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  Download,
  Play,
  Pause,
  Eye,
  Clock,
  ThumbsUp,
  Share,
  BarChart3,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration: string;
  uploadDate: string;
  publishDate: string;
  category: string;
  tags: string[];
  isActive: boolean;
  views: number;
  likes: number;
  status: 'active' | 'inactive' | 'processing';
  channelTitle: string;
}

interface VideoManagementProps {
  className?: string;
}

const VideoManagement: React.FC<VideoManagementProps> = ({ className }) => {
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: "1",
      title: "Safety Training: Personal Protective Equipment",
      description: "Comprehensive guide on proper PPE usage and maintenance",
      youtubeId: "dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "12:45",
      uploadDate: "2025-09-27",
      publishDate: "2025-09-27",
      category: "Safety Training",
      tags: ["safety", "ppe", "training"],
      isActive: true,
      views: 245,
      likes: 23,
      status: "active",
      channelTitle: "RSRG Safety"
    },
    {
      id: "2",
      title: "Equipment Operation: Forklift Safety",
      description: "Essential forklift operation and safety procedures",
      youtubeId: "dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "18:30",
      uploadDate: "2025-09-26",
      publishDate: "2025-09-26",
      category: "Equipment Training",
      tags: ["forklift", "safety", "equipment"],
      isActive: true,
      views: 189,
      likes: 18,
      status: "active",
      channelTitle: "RSRG Training"
    },
    {
      id: "3",
      title: "Emergency Procedures: Fire Safety",
      description: "Emergency response procedures for fire incidents",
      youtubeId: "dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "15:20",
      uploadDate: "2025-09-25",
      publishDate: "2025-09-25",
      category: "Emergency Training",
      tags: ["emergency", "fire", "safety"],
      isActive: false,
      views: 156,
      likes: 15,
      status: "inactive",
      channelTitle: "RSRG Safety"
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [newVideo, setNewVideo] = useState<Partial<VideoItem>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || video.category === filterCategory;
    const matchesStatus = filterStatus === "all" || video.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateVideo = () => {
    if (!newVideo.title || !newVideo.youtubeId || !newVideo.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const video: VideoItem = {
      id: Date.now().toString(),
      title: newVideo.title!,
      description: newVideo.description || "",
      youtubeId: newVideo.youtubeId!,
      thumbnailUrl: `https://img.youtube.com/vi/${newVideo.youtubeId}/maxresdefault.jpg`,
      duration: "0:00", // Would be fetched from YouTube API
      uploadDate: new Date().toISOString().split('T')[0],
      publishDate: new Date().toISOString().split('T')[0],
      category: newVideo.category!,
      tags: newVideo.tags || [],
      isActive: newVideo.isActive || true,
      views: 0,
      likes: 0,
      status: "processing",
      channelTitle: "RSRG"
    };

    setVideos([...videos, video]);
    setNewVideo({});
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Video added successfully"
    });
  };

  const handleEditVideo = () => {
    if (!selectedVideo) return;

    setVideos(videos.map(video =>
      video.id === selectedVideo.id ? selectedVideo : video
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Success",
      description: "Video updated successfully"
    });
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter(video => video.id !== videoId));
    toast({
      title: "Success",
      description: "Video deleted successfully"
    });
  };

  const handleToggleVideoStatus = (videoId: string) => {
    setVideos(videos.map(video =>
      video.id === videoId
        ? { ...video, isActive: !video.isActive, status: video.isActive ? 'inactive' : 'active' }
        : video
    ));
  };

  const handleRefreshFromYouTube = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Success",
        description: "Video data refreshed from YouTube"
      });
    }, 2000);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const VideoForm = ({ video, onSubmit, onCancel, isEdit = false }: {
    video: Partial<VideoItem>,
    onSubmit: () => void,
    onCancel: () => void,
    isEdit?: boolean
  }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Video Title *</Label>
        <Input
          id="title"
          value={video.title || ""}
          onChange={(e) => {
            if (isEdit && selectedVideo) {
              setSelectedVideo({...selectedVideo, title: e.target.value});
            } else {
              setNewVideo({...newVideo, title: e.target.value});
            }
          }}
          placeholder="Enter video title"
        />
      </div>

      <div>
        <Label htmlFor="youtubeId">YouTube Video ID *</Label>
        <Input
          id="youtubeId"
          value={video.youtubeId || ""}
          onChange={(e) => {
            if (isEdit && selectedVideo) {
              setSelectedVideo({...selectedVideo, youtubeId: e.target.value});
            } else {
              setNewVideo({...newVideo, youtubeId: e.target.value});
            }
          }}
          placeholder="e.g. dQw4w9WgXcQ"
          disabled={isEdit}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Extract from YouTube URL: https://youtube.com/watch?v=<strong>VIDEO_ID</strong>
        </p>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={3}
          value={video.description || ""}
          onChange={(e) => {
            if (isEdit && selectedVideo) {
              setSelectedVideo({...selectedVideo, description: e.target.value});
            } else {
              setNewVideo({...newVideo, description: e.target.value});
            }
          }}
          placeholder="Enter video description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={video.category}
            onValueChange={(value) => {
              if (isEdit && selectedVideo) {
                setSelectedVideo({...selectedVideo, category: value});
              } else {
                setNewVideo({...newVideo, category: value});
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Safety Training">Safety Training</SelectItem>
              <SelectItem value="Equipment Training">Equipment Training</SelectItem>
              <SelectItem value="Emergency Training">Emergency Training</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            checked={video.isActive || false}
            onCheckedChange={(checked) => {
              if (isEdit && selectedVideo) {
                setSelectedVideo({...selectedVideo, isActive: checked});
              } else {
                setNewVideo({...newVideo, isActive: checked});
              }
            }}
          />
          <Label>Active</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={video.tags?.join(', ') || ""}
          onChange={(e) => {
            const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
            if (isEdit && selectedVideo) {
              setSelectedVideo({...selectedVideo, tags});
            } else {
              setNewVideo({...newVideo, tags});
            }
          }}
          placeholder="safety, training, equipment"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>{isEdit ? 'Update' : 'Add Video'}</Button>
      </div>
    </div>
  );

  const videoStats = {
    total: videos.length,
    active: videos.filter(video => video.isActive).length,
    totalViews: videos.reduce((sum, video) => sum + video.views, 0),
    totalLikes: videos.reduce((sum, video) => sum + video.likes, 0)
  };

  const categories = Array.from(new Set(videos.map(video => video.category)));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Video Management</h2>
          <p className="text-muted-foreground">Manage safety and training videos from YouTube</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Video
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Video</DialogTitle>
                <DialogDescription>
                  Add a YouTube video to the safety training library.
                </DialogDescription>
              </DialogHeader>
              <VideoForm
                video={newVideo}
                onSubmit={handleCreateVideo}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={handleRefreshFromYouTube}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh from YouTube
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Video Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Videos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoStats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoStats.totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoStats.totalLikes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Videos Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Videos ({filteredVideos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative w-20 h-14 bg-gray-200 rounded overflow-hidden">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-video.jpg';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium line-clamp-1">{video.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {video.description}
                          </div>
                          <div className="flex gap-1 mt-1">
                            {video.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {video.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{video.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{video.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(video.status)}>
                        {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="h-3 w-3" />
                          {video.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <ThumbsUp className="h-3 w-3" />
                          {video.likes}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(video.uploadDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>

                        <Dialog open={isEditDialogOpen && selectedVideo?.id === video.id} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedVideo(video)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Video</DialogTitle>
                              <DialogDescription>
                                Update video information and settings.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedVideo && (
                              <VideoForm
                                video={selectedVideo}
                                onSubmit={handleEditVideo}
                                onCancel={() => setIsEditDialogOpen(false)}
                                isEdit={true}
                              />
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleVideoStatus(video.id)}
                        >
                          {video.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Video</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{video.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteVideo(video.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoManagement;