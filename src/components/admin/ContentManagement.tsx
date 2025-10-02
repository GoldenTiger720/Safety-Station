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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Tag,
  Image,
  Video,
  FileIcon,
  Globe,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: 'news' | 'document' | 'video' | 'announcement';
  content: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  publishDate: string;
  lastModified: string;
  views: number;
  tags: string[];
  featured: boolean;
  thumbnail?: string;
}

interface ContentManagementProps {
  className?: string;
}

const ContentManagement: React.FC<ContentManagementProps> = ({ className }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "The Inside Track: September",
      type: "news",
      content: "Latest company updates and news for September...",
      author: "John Smith",
      status: "published",
      publishDate: "2025-09-28",
      lastModified: "2025-09-29 14:30",
      views: 245,
      tags: ["newsletter", "updates"],
      featured: true,
      thumbnail: "/news-thumb-1.jpg"
    },
    {
      id: "2",
      title: "Safety Protocol Updates",
      type: "document",
      content: "Updated safety protocols for all departments...",
      author: "Sarah Wilson",
      status: "published",
      publishDate: "2025-09-26",
      lastModified: "2025-09-27 09:15",
      views: 189,
      tags: ["safety", "protocols"],
      featured: false
    },
    {
      id: "3",
      title: "New Training Video Series",
      type: "video",
      content: "Comprehensive training video series for new employees...",
      author: "Mike Davis",
      status: "draft",
      publishDate: "2025-09-29",
      lastModified: "2025-09-29 16:45",
      views: 0,
      tags: ["training", "video"],
      featured: false
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({});
  const { toast } = useToast();

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateContent = () => {
    if (!newContent.title || !newContent.type || !newContent.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const content: ContentItem = {
      id: Date.now().toString(),
      title: newContent.title!,
      type: newContent.type! as ContentItem['type'],
      content: newContent.content!,
      author: "Current User", // This would come from auth context
      status: "draft",
      publishDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString(),
      views: 0,
      tags: newContent.tags || [],
      featured: newContent.featured || false
    };

    setContentItems([...contentItems, content]);
    setNewContent({});
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Content created successfully"
    });
  };

  const handleEditContent = () => {
    if (!selectedItem) return;

    setContentItems(contentItems.map(item =>
      item.id === selectedItem.id
        ? { ...selectedItem, lastModified: new Date().toISOString() }
        : item
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Success",
      description: "Content updated successfully"
    });
  };

  const handleDeleteContent = (contentId: string) => {
    setContentItems(contentItems.filter(item => item.id !== contentId));
    toast({
      title: "Success",
      description: "Content deleted successfully"
    });
  };

  const handlePublishContent = (contentId: string) => {
    setContentItems(contentItems.map(item =>
      item.id === contentId
        ? { ...item, status: 'published' as ContentItem['status'], publishDate: new Date().toISOString().split('T')[0] }
        : item
    ));
    toast({
      title: "Success",
      description: "Content published successfully"
    });
  };

  const handleArchiveContent = (contentId: string) => {
    setContentItems(contentItems.map(item =>
      item.id === contentId
        ? { ...item, status: 'archived' as ContentItem['status'] }
        : item
    ));
    toast({
      title: "Success",
      description: "Content archived successfully"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return FileText;
      case 'document': return FileIcon;
      case 'video': return Video;
      case 'announcement': return Globe;
      default: return FileText;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ContentForm = ({ content, onSubmit, onCancel, isEdit = false }: {
    content: Partial<ContentItem>,
    onSubmit: () => void,
    onCancel: () => void,
    isEdit?: boolean
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={content.title || ""}
            onChange={(e) => {
              if (isEdit && selectedItem) {
                setSelectedItem({...selectedItem, title: e.target.value});
              } else {
                setNewContent({...newContent, title: e.target.value});
              }
            }}
            placeholder="Enter content title"
          />
        </div>
        <div>
          <Label htmlFor="type">Type *</Label>
          <Select
            value={content.type}
            onValueChange={(value) => {
              if (isEdit && selectedItem) {
                setSelectedItem({...selectedItem, type: value as ContentItem['type']});
              } else {
                setNewContent({...newContent, type: value as ContentItem['type']});
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="news">News Article</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          rows={6}
          value={content.content || ""}
          onChange={(e) => {
            if (isEdit && selectedItem) {
              setSelectedItem({...selectedItem, content: e.target.value});
            } else {
              setNewContent({...newContent, content: e.target.value});
            }
          }}
          placeholder="Enter content body..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={content.tags?.join(', ') || ""}
            onChange={(e) => {
              const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
              if (isEdit && selectedItem) {
                setSelectedItem({...selectedItem, tags});
              } else {
                setNewContent({...newContent, tags});
              }
            }}
            placeholder="Enter tags..."
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            checked={content.featured || false}
            onCheckedChange={(checked) => {
              if (isEdit && selectedItem) {
                setSelectedItem({...selectedItem, featured: checked});
              } else {
                setNewContent({...newContent, featured: checked});
              }
            }}
          />
          <Label>Featured Content</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>{isEdit ? 'Update' : 'Create'}</Button>
      </div>
    </div>
  );

  const contentStats = {
    total: contentItems.length,
    published: contentItems.filter(item => item.status === 'published').length,
    draft: contentItems.filter(item => item.status === 'draft').length,
    totalViews: contentItems.reduce((sum, item) => sum + item.views, 0)
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">Manage news, documents, videos, and announcements</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
                <DialogDescription>
                  Create new content for the dashboard and system.
                </DialogDescription>
              </DialogHeader>
              <ContentForm
                content={newContent}
                onSubmit={handleCreateContent}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.draft}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalViews.toLocaleString()}</div>
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
                  placeholder="Search content by title, content, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Items ({filteredContent.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.map((content) => {
                  const TypeIcon = getTypeIcon(content.type);
                  return (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <TypeIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {content.title}
                              {content.featured && (
                                <Badge variant="secondary" className="text-xs">Featured</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {content.content.substring(0, 80)}...
                            </div>
                            {content.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {content.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {content.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{content.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{content.author}</div>
                          <div className="text-muted-foreground">
                            {new Date(content.publishDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(content.status)}>
                          {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {content.views.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(content.lastModified).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog open={isEditDialogOpen && selectedItem?.id === content.id} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedItem(content)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Edit Content</DialogTitle>
                                <DialogDescription>
                                  Update content information and settings.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedItem && (
                                <ContentForm
                                  content={selectedItem}
                                  onSubmit={handleEditContent}
                                  onCancel={() => setIsEditDialogOpen(false)}
                                  isEdit={true}
                                />
                              )}
                            </DialogContent>
                          </Dialog>

                          {content.status === 'draft' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePublishContent(content.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}

                          {content.status === 'published' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleArchiveContent(content.id)}
                              className="text-yellow-600 hover:text-yellow-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Content</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{content.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteContent(content.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;