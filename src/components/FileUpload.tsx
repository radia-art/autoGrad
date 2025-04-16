
import React, { useState } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFiles = Array.from(e.dataTransfer.files);
    addFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    // Only accept PDFs and images
    const validFiles = newFiles.filter(file => 
      file.type.includes('pdf') || file.type.includes('image/')
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file(s)",
        description: "Only PDF and image files are accepted",
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    // Simulate file upload with progress
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    toast({
      title: "Upload complete",
      description: "Files have been successfully uploaded for grading",
      variant: "default"
    });

    // Reset after successful upload
    setUploading(false);
    setProgress(0);
    // Note: In a real app, we wouldn't clear files here until grading results are shown
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-700",
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-secondary rounded-full">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Drag & drop exam files</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Upload PDFs or images of exams to be graded
            </p>
          </div>
          <div>
            <label htmlFor="file-upload">
              <Button variant="outline" className="mt-2" onClick={() => document.getElementById('file-upload')?.click()}>
                Select Files
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            PDF or images up to 10MB
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Files to upload ({files.length})</h3>
          {files.map((file, index) => (
            <Card key={`${file.name}-${index}`} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary rounded-md">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium truncate max-w-[200px] sm:max-w-[400px]">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {uploading ? (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-center text-gray-500">Processing... {progress}%</p>
            </div>
          ) : (
            <Button onClick={handleUpload} className="w-full" disabled={files.length === 0}>
              {files.length > 1 ? `Upload ${files.length} Files` : "Upload File"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
