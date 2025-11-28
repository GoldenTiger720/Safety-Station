"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DepotButton } from "@/components/ui/depot-button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar } from "lucide-react";

interface Document {
  id: string;
  title: string;
  category: "maintenance" | "operation" | "safety" | "training";
  lastUpdated: string;
  size: string;
  type: "PDF" | "DOC" | "PPT";
}

const documents: Document[] = [
  {
    id: "1",
    title: "Vehicle Maintenance Checklist 2024",
    category: "maintenance",
    lastUpdated: "2024-01-15",
    size: "2.5 MB",
    type: "PDF",
  },
  {
    id: "2",
    title: "Safety Protocol Handbook",
    category: "safety",
    lastUpdated: "2024-01-10",
    size: "5.2 MB",
    type: "PDF",
  },
  {
    id: "3",
    title: "Operating Procedures Manual",
    category: "operation",
    lastUpdated: "2024-01-08",
    size: "3.1 MB",
    type: "DOC",
  },
  {
    id: "4",
    title: "Emergency Response Guidelines",
    category: "safety",
    lastUpdated: "2024-01-05",
    size: "1.8 MB",
    type: "PDF",
  },
  {
    id: "5",
    title: "Equipment Training Slides",
    category: "training",
    lastUpdated: "2024-01-03",
    size: "12.4 MB",
    type: "PPT",
  },
  {
    id: "6",
    title: "Preventive Maintenance Schedule",
    category: "maintenance",
    lastUpdated: "2023-12-28",
    size: "892 KB",
    type: "PDF",
  },
];

const getCategoryColor = (category: Document["category"]) => {
  const colors = {
    maintenance: "bg-depot-warning",
    operation: "bg-depot-primary",
    safety: "bg-depot-accent",
    training: "bg-depot-success",
  };
  return colors[category];
};

const DocumentViewer: React.FC = () => {
  const handleView = (doc: Document) => {
    console.log("Viewing document:", doc.title);
  };

  const handleDownload = (doc: Document) => {
    console.log("Downloading document:", doc.title);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6" />
            Document Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-depot-surface rounded-lg border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{doc.title}</h3>
                      <Badge
                        className={`${getCategoryColor(doc.category)} text-white`}
                      >
                        {doc.category.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="font-mono">
                        {doc.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Updated:{" "}
                        {new Date(doc.lastUpdated).toLocaleDateString()}
                      </div>
                      <div>Size: {doc.size}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <DepotButton
                      variant="secondary"
                      onClick={() => handleView(doc)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </DepotButton>
                    <DepotButton
                      variant="default"
                      onClick={() => handleDownload(doc)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </DepotButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentViewer;
