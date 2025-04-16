
import React from 'react';
import { Download, Printer, Share2, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface GradingResultProps {
  showDemo?: boolean;
}

const GradingResult: React.FC<GradingResultProps> = ({ showDemo = true }) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Feature coming soon",
      description: `The ${action} feature will be available in the next update.`,
      variant: "default"
    });
  };

  if (!showDemo) {
    return (
      <div className="text-center py-20 px-4">
        <div className="inline-flex items-center justify-center p-4 bg-secondary rounded-full mb-4">
          <BarChart className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No Grading Results Yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Upload exam files to see AI-powered grading results and detailed feedback here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Grading Results</h2>
          <p className="text-muted-foreground">Physics Final Exam - May 2025</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction("download")}>
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("print")}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("share")}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">87%</div>
            <Badge className="mt-2 bg-grading-good">B+</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">92%</div>
            <Progress value={92} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">85%</div>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">45m</div>
            <p className="text-sm text-muted-foreground mt-2">vs. manual grading</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
              <CardDescription>
                AI-generated personalized feedback for improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Strengths</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Excellent understanding of Newton's laws of motion</li>
                  <li>Clear application of conservation of energy principles</li>
                  <li>Strong mathematical work showing all steps</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Areas for Improvement</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Review thermodynamics concepts, particularly entropy</li>
                  <li>Practice more complex projectile motion problems</li>
                  <li>Include units consistently in all calculations</li>
                </ul>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-medium mb-2">Teacher Notes</h4>
                <p className="text-sm">
                  Student demonstrates strong analytical thinking but needs to work on showing complete reasoning in written responses. Consider providing additional practice with conceptual questions.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
              Graded automatically by Auto-Grade Scribe AI on April 14, 2025 • Verified by system
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of each exam question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((question) => (
                  <div key={question} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Question {question}</h4>
                        <p className="text-sm text-muted-foreground">
                          {question === 3 ? "Projectile Motion" : 
                           question === 4 ? "Thermodynamics" :
                           "Newton's Laws"}
                        </p>
                      </div>
                      <Badge 
                        className={
                          question === 3 ? "bg-grading-average" :
                          question === 4 ? "bg-grading-poor" :
                          "bg-grading-perfect"
                        }
                      >
                        {question === 3 ? "8/10" : 
                         question === 4 ? "6/10" :
                         "10/10"}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      {question === 3 ? 
                        "Good approach but missed accounting for air resistance" :
                        question === 4 ?
                        "Confusion between entropy and enthalpy concepts" :
                        "Perfect answer with all steps clearly shown"
                      }
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Statistical analysis of exam performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Detailed analytics charts will be displayed here in a future update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradingResult;
