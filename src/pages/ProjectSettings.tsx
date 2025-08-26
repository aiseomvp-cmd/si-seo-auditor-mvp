import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bell, Link as LinkIcon, BarChart3, Search, DollarSign, Webhook, Brain, Globe, TrendingUp, Key } from "lucide-react";

const ProjectSettings = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    weeklyAudit: false,
    notificationEmail: "",
    webhookUrl: "",
  });

  const [apiSettings, setApiSettings] = useState({
    n8nWebhook: "",
    ga4PropertyId: "",
    ga4ApiKey: "",
    gscSiteUrl: "",
    gscApiKey: "",
    perplexityApiKey: "",
    semrushApiKey: "",
    openaiApiKey: "",
    screenshotApiKey: "",
    playwrightEndpoint: "",
  });

  const handleSave = () => {
    // Save to localStorage for demo
    localStorage.setItem('project-settings', JSON.stringify(settings));
    toast({
      title: "Settings Updated!",
      description: "Your project settings have been saved successfully.",
      variant: "default",
    });
  };

  const handleSaveApiSettings = () => {
    // Save to localStorage for demo
    localStorage.setItem('api-settings', JSON.stringify(apiSettings));
    toast({
      title: "API Settings Saved!",
      description: "Your API configurations have been saved successfully.",
      variant: "default",
    });
  };

  const handleTestConnection = (apiName: string) => {
    toast({
      title: "Testing Connection...",
      description: `Testing ${apiName} API connection. This is a demo placeholder.`,
    });
  };

  const integrations = [
    { name: "GA4", icon: BarChart3, description: "Google Analytics 4 integration", color: "text-brand-blue" },
    { name: "Perplexity", icon: Search, description: "AI search visibility tracking", color: "text-brand-teal" },
    { name: "GSC", icon: Search, description: "Google Search Console data", color: "text-brand-lime" },
    { name: "SEMrush", icon: DollarSign, description: "Competitive intelligence", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2 text-gradient">
            Project Settings
          </h1>
          <p className="text-muted-foreground">Project ID: {id}</p>
          <div className="wavy-divider w-24 mt-4"></div>
        </div>

        <div className="space-y-8">
          {/* Alert Settings */}
          <GradientCard elevated>
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-brand-blue" />
              <h2 className="text-xl font-heading font-bold">Alert Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyAudit" className="text-base font-semibold">
                    Enable Weekly Audit
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically run audits every week and get email reports
                  </p>
                </div>
                <Switch
                  id="weeklyAudit"
                  checked={settings.weeklyAudit}
                  onCheckedChange={(checked) => setSettings({...settings, weeklyAudit: checked})}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-semibold">
                  Notification Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@company.com"
                  value={settings.notificationEmail}
                  onChange={(e) => setSettings({...settings, notificationEmail: e.target.value})}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="webhook" className="text-base font-semibold">
                  Webhook URL (Optional)
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Send audit results to your internal systems
                </p>
                <Input
                  id="webhook"
                  type="url"
                  placeholder="https://your-api.com/webhook"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings({...settings, webhookUrl: e.target.value})}
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={handleSave}
                variant="success"
                className="w-full"
              >
                Save Alert Settings
              </Button>
            </div>
          </GradientCard>

          {/* API Configuration */}
          <GradientCard elevated>
            <div className="flex items-center space-x-3 mb-6">
              <Key className="w-6 h-6 text-brand-teal" />
              <h2 className="text-xl font-heading font-bold">API Configuration</h2>
            </div>
            
            <div className="grid gap-6">
              {/* n8n Workflow */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Webhook className="w-5 h-5 text-brand-blue" />
                  <h3 className="font-semibold text-lg">n8n Workflow Engine</h3>
                </div>
                <div>
                  <Label htmlFor="n8nWebhook" className="text-sm font-medium">
                    n8n Webhook URL
                  </Label>
                  <Input
                    id="n8nWebhook"
                    type="url"
                    placeholder="https://your-n8n.domain.com/webhook/..."
                    value={apiSettings.n8nWebhook}
                    onChange={(e) => setApiSettings({...apiSettings, n8nWebhook: e.target.value})}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Central workflow automation endpoint</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleTestConnection("n8n")}
                >
                  Test n8n Connection
                </Button>
              </div>

              {/* Google Analytics 4 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-brand-blue" />
                  <h3 className="font-semibold text-lg">Google Analytics 4</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ga4PropertyId" className="text-sm font-medium">
                      GA4 Property ID
                    </Label>
                    <Input
                      id="ga4PropertyId"
                      placeholder="123456789"
                      value={apiSettings.ga4PropertyId}
                      onChange={(e) => setApiSettings({...apiSettings, ga4PropertyId: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ga4ApiKey" className="text-sm font-medium">
                      GA4 API Key
                    </Label>
                    <Input
                      id="ga4ApiKey"
                      type="password"
                      placeholder="AIza..."
                      value={apiSettings.ga4ApiKey}
                      onChange={(e) => setApiSettings({...apiSettings, ga4ApiKey: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleTestConnection("GA4")}
                >
                  Test GA4 Connection
                </Button>
              </div>

              {/* Google Search Console */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-brand-lime" />
                  <h3 className="font-semibold text-lg">Google Search Console</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gscSiteUrl" className="text-sm font-medium">
                      Site URL
                    </Label>
                    <Input
                      id="gscSiteUrl"
                      placeholder="https://example.com/"
                      value={apiSettings.gscSiteUrl}
                      onChange={(e) => setApiSettings({...apiSettings, gscSiteUrl: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gscApiKey" className="text-sm font-medium">
                      GSC API Key
                    </Label>
                    <Input
                      id="gscApiKey"
                      type="password"
                      placeholder="AIza..."
                      value={apiSettings.gscApiKey}
                      onChange={(e) => setApiSettings({...apiSettings, gscApiKey: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleTestConnection("GSC")}
                >
                  Test GSC Connection
                </Button>
              </div>

              {/* AI Services */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-semibold text-lg">AI Services</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="perplexityApiKey" className="text-sm font-medium">
                      Perplexity API Key
                    </Label>
                    <Input
                      id="perplexityApiKey"
                      type="password"
                      placeholder="pplx-..."
                      value={apiSettings.perplexityApiKey}
                      onChange={(e) => setApiSettings({...apiSettings, perplexityApiKey: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="openaiApiKey" className="text-sm font-medium">
                      OpenAI API Key
                    </Label>
                    <Input
                      id="openaiApiKey"
                      type="password"
                      placeholder="sk-..."
                      value={apiSettings.openaiApiKey}
                      onChange={(e) => setApiSettings({...apiSettings, openaiApiKey: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleTestConnection("Perplexity")}
                  >
                    Test Perplexity
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleTestConnection("OpenAI")}
                  >
                    Test OpenAI
                  </Button>
                </div>
              </div>

              {/* SEO Tools */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold text-lg">SEO & Competitor Tools</h3>
                </div>
                <div>
                  <Label htmlFor="semrushApiKey" className="text-sm font-medium">
                    SEMrush API Key
                  </Label>
                  <Input
                    id="semrushApiKey"
                    type="password"
                    placeholder="semrush-api-key..."
                    value={apiSettings.semrushApiKey}
                    onChange={(e) => setApiSettings({...apiSettings, semrushApiKey: e.target.value})}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">For competitive intelligence and keyword data</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleTestConnection("SEMrush")}
                >
                  Test SEMrush Connection
                </Button>
              </div>

              {/* Technical APIs */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-brand-blue" />
                  <h3 className="font-semibold text-lg">Technical Services</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="screenshotApiKey" className="text-sm font-medium">
                      Screenshot API Key
                    </Label>
                    <Input
                      id="screenshotApiKey"
                      type="password"
                      placeholder="screenshot-api-key..."
                      value={apiSettings.screenshotApiKey}
                      onChange={(e) => setApiSettings({...apiSettings, screenshotApiKey: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="playwrightEndpoint" className="text-sm font-medium">
                      Playwright Endpoint
                    </Label>
                    <Input
                      id="playwrightEndpoint"
                      placeholder="https://playwright.service.com"
                      value={apiSettings.playwrightEndpoint}
                      onChange={(e) => setApiSettings({...apiSettings, playwrightEndpoint: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleTestConnection("Screenshot API")}
                  >
                    Test Screenshot
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleTestConnection("Playwright")}
                  >
                    Test Playwright
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleSaveApiSettings}
                variant="success"
                className="w-full mt-6"
              >
                Save All API Configurations
              </Button>
            </div>
          </GradientCard>

          {/* Danger Zone */}
          <GradientCard>
            <h2 className="text-xl font-heading font-bold mb-4 text-destructive">
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-destructive/20 rounded-lg">
                <h3 className="font-semibold mb-2">Delete Project</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This will permanently delete all audit data for this project. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm">
                  Delete Project
                </Button>
              </div>
            </div>
          </GradientCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectSettings;