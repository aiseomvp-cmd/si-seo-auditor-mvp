import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { ShimmerPlaceholder } from "@/components/ui/ShimmerPlaceholder";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, AlertTriangle, CheckCircle, Download } from "lucide-react";

const ProjectOverview = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app, this would come from API
  const mockGaps = [
    {
      issue: "Missing FAQ schema for key drug questions",
      page: "/products/medication-x",
      impact: "High",
      effort: "Low",
      recommendation: "Add structured FAQ data",
      quickWin: true,
    },
    {
      issue: "AI citations missing brand mentions",
      page: "Global",
      impact: "High",
      effort: "Medium",
      recommendation: "Optimize content for AI visibility",
      quickWin: false,
    },
    {
      issue: "Competitor ranking higher for key queries",
      page: "/conditions/diabetes",
      impact: "Medium",
      effort: "High",
      recommendation: "Enhance content depth and authority",
      quickWin: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2 text-white">
            Audit Results Dashboard
          </h1>
          <p className="text-white/80">Project ID: {id}</p>
          <div className="wavy-divider w-24 mt-4"></div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gradient-card border-0">
            <TabsTrigger value="overview" className="font-semibold text-brand-dark data-[state=active]:text-green-600">Overview</TabsTrigger>
            <TabsTrigger value="seo" className="font-semibold text-brand-dark data-[state=active]:text-green-600">SEO Issues</TabsTrigger>
            <TabsTrigger value="ai" className="font-semibold text-brand-dark data-[state=active]:text-green-600">AI Visibility</TabsTrigger>
            <TabsTrigger value="wins" className="font-semibold text-brand-dark data-[state=active]:text-green-600">Quick Wins</TabsTrigger>
            <TabsTrigger value="settings" className="font-semibold text-brand-dark data-[state=active]:text-green-600">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Score Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <GradientCard elevated>
                <div className="text-center">
                  <div className="text-3xl font-bold count-up text-brand-blue">78</div>
                  <div className="text-sm text-brand-dark font-mono">SEO Score</div>
                  <TrendingUp className="w-6 h-6 mx-auto mt-2 text-success" />
                </div>
              </GradientCard>
              
              <GradientCard elevated>
                <div className="text-center">
                  <div className="text-3xl font-bold count-up text-brand-purple">65</div>
                  <div className="text-sm text-brand-dark font-mono">AI Citation Score</div>
                  <TrendingUp className="w-6 h-6 mx-auto mt-2 text-brand-purple" />
                </div>
              </GradientCard>
              
              <GradientCard elevated>
                <div className="text-center">
                  <div className="text-3xl font-bold count-up text-destructive">12</div>
                  <div className="text-sm text-brand-dark font-mono">Critical Issues</div>
                  <AlertTriangle className="w-6 h-6 mx-auto mt-2 text-destructive" />
                </div>
              </GradientCard>
            </div>

            {/* Gaps Table */}
            <GradientCard elevated>
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-bold text-brand-dark">Opportunity Gaps</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-brand-dark">Issue</TableHead>
                        <TableHead className="text-brand-dark">Page/Question</TableHead>
                        <TableHead className="text-brand-dark">Impact</TableHead>
                        <TableHead className="text-brand-dark">Effort</TableHead>
                        <TableHead className="text-brand-dark">Recommendation</TableHead>
                        <TableHead className="text-brand-dark">Quick Win</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockGaps.map((gap, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-brand-dark">{gap.issue}</TableCell>
                          <TableCell className="font-mono text-sm text-brand-dark">{gap.page}</TableCell>
                          <TableCell>
                            <Badge variant={gap.impact === 'High' ? 'destructive' : gap.impact === 'Medium' ? 'default' : 'secondary'}>
                              {gap.impact}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={gap.effort === 'Low' ? 'default' : gap.effort === 'Medium' ? 'secondary' : 'outline'}>
                              {gap.effort}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-brand-dark">{gap.recommendation}</TableCell>
                          <TableCell>
                            {gap.quickWin && (
                              <Badge className="bg-success text-success-foreground">
                                Quick Win
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </GradientCard>

            {/* Forecast Chart */}
            <ShimmerPlaceholder message="Connect GA4 to unlock traffic forecasts">
              <GradientCard>
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-bold text-brand-dark">6 Month Traffic Uplift Forecast</h2>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 text-brand-dark" />
                      <p className="text-brand-dark">Chart will appear here</p>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full">
                    Connect GA4 to Unlock Forecasts
                  </Button>
                </div>
              </GradientCard>
            </ShimmerPlaceholder>

            {/* Export Button */}
            <div className="flex justify-center">
              <Button variant="cta" className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Export CSV Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <ShimmerPlaceholder>
              <GradientCard>
                <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">SEO Issues Analysis</h2>
                <p className="text-brand-dark/70">Detailed SEO issues and recommendations will appear here.</p>
              </GradientCard>
            </ShimmerPlaceholder>
          </TabsContent>

          <TabsContent value="ai">
            <ShimmerPlaceholder>
              <GradientCard>
                <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">AI Visibility Report</h2>
                <p className="text-brand-dark/70">AI citation analysis and visibility metrics will appear here.</p>
              </GradientCard>
            </ShimmerPlaceholder>
          </TabsContent>

          <TabsContent value="wins">
            <GradientCard elevated>
              <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">Quick Wins</h2>
              <div className="space-y-4">
                {mockGaps
                  .filter(gap => gap.quickWin)
                  .map((gap, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-brand-dark">{gap.issue}</h3>
                        <p className="text-sm text-brand-dark/70">{gap.recommendation}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="outline">Low Effort</Badge>
                          <Badge variant="destructive">High Impact</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </GradientCard>
          </TabsContent>

          <TabsContent value="settings">
            <div className="max-w-2xl">
              <GradientCard elevated>
                <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">Project Settings</h2>
                <p className="text-brand-dark/70 mb-4">Manage alerts, integrations, and notifications for this audit.</p>
                <Button variant="hero">
                  Go to Settings
                </Button>
              </GradientCard>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectOverview;