
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUpload from './FileUpload';
import GradingResult from './GradingResult';
import { BookOpen, Upload, BarChart3, History, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upload");
  
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-heading">Welcome to Auto-Grade Scribe</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered exam grading system that provides detailed feedback and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col p-2">
                <button 
                  onClick={() => setActiveTab("upload")}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === "upload" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                >
                  <Upload size={18} />
                  <span>Upload Exams</span>
                </button>
                <button 
                  onClick={() => setActiveTab("results")}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === "results" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                >
                  <BarChart3 size={18} />
                  <span>Grading Results</span>
                </button>
                <button 
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === "history" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                >
                  <History size={18} />
                  <span>History</span>
                </button>
                <button 
                  onClick={() => setActiveTab("materials")}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === "materials" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                >
                  <BookOpen size={18} />
                  <span>Study Materials</span>
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === "settings" 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="upload"><Upload className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="results"><BarChart3 className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="history"><History className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="materials"><BookOpen className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="settings"><Settings className="h-5 w-5" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="col-span-1 space-y-6">
          {activeTab === "upload" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Upload Exams</CardTitle>
                  <CardDescription>
                    Upload exam files for AI-powered grading and feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload />
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "results" && (
            <GradingResult showDemo={true} />
          )}

          {activeTab === "history" && (
            <Card>
              <CardHeader>
                <CardTitle>Grading History</CardTitle>
                <CardDescription>
                  View your past grading results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Your grading history will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "materials" && (
            <Card>
              <CardHeader>
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>
                  Access recommended study resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    AI-recommended study materials based on your grading results will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Configure your grading preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    System settings and preferences will be available here in a future update
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
