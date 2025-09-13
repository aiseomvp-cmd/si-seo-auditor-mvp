import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { ShimmerPlaceholder } from "@/components/ui/ShimmerPlaceholder";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, AlertTriangle, CheckCircle, Download, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProjectOverview = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditData = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('seo_audits')
          .select('audit_data')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setAuditData(data?.audit_data);
      } catch (error) {
        console.error('Error fetching audit data:', error);
        toast({
          title: "Error",
          description: "Failed to load audit data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAuditData();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Loading audit data...</p>
        </div>
      </div>
    );
  }

  if (!auditData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Audit data not found.</p>
        </div>
      </div>
    );
  }

  const audit = auditData.audit;

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
            <div className="grid md:grid-cols-3 gap-6">
              <GradientCard elevated>
                <div className="text-center">
                  <div className="text-3xl font-bold count-up text-brand-blue">{audit.seoScore}</div>
                  <div className="text-sm text-brand-dark font-mono">SEO Score</div>
                  <TrendingUp className="w-6 h-6 mx-auto mt-2 text-success" />
                </div>
              </GradientCard>
              
              <GradientCard elevated>
                <div className="text-center">
                  <div className="text-3xl font-bold count-up text-brand-purple">{audit.aiCitationScore}</div>
                  <div className="text-sm text-brand-dark font-mono">AI Citation Score</div>
                  <TrendingUp className="w-6 h-6 mx-auto mt-2 text-brand-purple" />
                </div>
              </GradientCard>
              
              <GradientCard elevated>
                <div className="text-center">
                  <div className="text-3xl font-bold count-up text-destructive">{audit.criticalIssues}</div>
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
                      {audit.opportunityGaps?.map((gap: any, index: number) => (
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

            {/* Traffic Forecast Chart */}
            <GradientCard elevated>
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-bold text-brand-dark">6 Month Traffic Uplift Forecast</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-dark mb-2">Current Traffic Trend</h3>
                    <div className="flex items-end space-x-1 h-24">
                      {audit.forecast?.currentTraffic?.map((value: number, index: number) => (
                        <div key={index} className="bg-brand-blue/30 rounded-t" style={{
                          height: `${(value / Math.max(...audit.forecast.currentTraffic)) * 100}%`,
                          width: '16.666%'
                        }}>
                          <div className="text-xs text-center text-brand-dark mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-dark mb-2">Projected Uplift</h3>
                    <div className="flex items-end space-x-1 h-24">
                      {audit.forecast?.projectedUplift?.map((value: number, index: number) => (
                        <div key={index} className="bg-success/60 rounded-t" style={{
                          height: `${(value / Math.max(...audit.forecast.projectedUplift)) * 100}%`,
                          width: '16.666%'
                        }}>
                          <div className="text-xs text-center text-brand-dark mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GradientCard>

            {/* Export Button */}
            <div className="flex justify-center">
              <Button variant="cta" className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Export CSV Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <GradientCard elevated>
              <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">SEO Issues Analysis</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-brand-dark">Issue</TableHead>
                      <TableHead className="text-brand-dark">Page</TableHead>
                      <TableHead className="text-brand-dark">Impact</TableHead>
                      <TableHead className="text-brand-dark">Recommendation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audit.seoIssues?.map((issue: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-brand-dark">{issue.issue}</TableCell>
                        <TableCell className="font-mono text-sm text-brand-dark">{issue.page}</TableCell>
                        <TableCell>
                          <Badge variant={issue.impact === 'High' ? 'destructive' : issue.impact === 'Medium' ? 'default' : 'secondary'}>
                            {issue.impact}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-brand-dark">{issue.recommendation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </GradientCard>
          </TabsContent>

          <TabsContent value="ai">
            <GradientCard elevated>
              <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">AI Visibility Report</h2>
              
              {/* AI Citation Comparison */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-3">Citation Comparison</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-brand-dark">Domain</TableHead>
                          <TableHead className="text-brand-dark">Citations</TableHead>
                          <TableHead className="text-brand-dark">SERP Mentions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {audit.aiVisibility?.comparison?.map((comp: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-mono text-sm text-brand-dark">{comp.domain}</TableCell>
                            <TableCell className="text-brand-dark">{comp.citations}</TableCell>
                            <TableCell className="text-brand-dark">{comp.SERP_mentions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Top Questions Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-3">Top Questions Performance</h3>
                  <div className="space-y-3">
                    {audit.aiVisibility?.topQuestionsPerformance?.map((perf: any, index: number) => {
                      // Get the site performance data (excluding question and topCompetitor)
                      const siteData = Object.entries(perf).find(([key]) => 
                        key !== 'question' && key !== 'topCompetitor'
                      )?.[1] as any;
                      
                      return (
                        <div key={index} className="p-4 bg-muted/10 rounded-lg border">
                          <h4 className="font-medium text-brand-dark mb-2">{perf.question}</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-semibold">Your Site:</span> Rank {siteData?.rank || 'N/A'}, Citations: {siteData?.citations || 0}
                            </div>
                            <div>
                              <span className="font-semibold">Top Competitor:</span> {perf.topCompetitor?.domain} (Rank {perf.topCompetitor?.rank}, Citations: {perf.topCompetitor?.citations})
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </GradientCard>
          </TabsContent>

          <TabsContent value="wins">
            <GradientCard elevated>
              <h2 className="text-xl font-heading font-bold mb-4 text-brand-dark">Quick Wins</h2>
              <div className="space-y-4">
                {audit.quickWins?.map((win: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="text-brand-dark">{win}</p>
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