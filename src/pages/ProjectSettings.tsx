import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Bell, Link as LinkIcon, BarChart3, Search, DollarSign } from "lucide-react";

const ProjectSettings = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    weeklyAudit: false,
    notificationEmail: "",
    webhookUrl: "",
  });

  const handleSave = () => {
    toast({
      title: "Settings Updated!",
      description: "Your project settings have been saved successfully.",
      variant: "default",
    });
  };

  const handleComingSoon = (integration: string) => {
    toast({
      title: "Coming Soon!",
      description: `${integration} integration will be available in the next release.`,
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

          {/* API Integrations */}
          <GradientCard elevated>
            <div className="flex items-center space-x-3 mb-6">
              <LinkIcon className="w-6 h-6 text-brand-teal" />
              <h2 className="text-xl font-heading font-bold">API Integrations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div 
                  key={integration.name}
                  className="p-4 border border-muted rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <integration.icon className={`w-6 h-6 ${integration.color}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {integration.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComingSoon(integration.name)}
                        className="w-full"
                      >
                        Connect {integration.name}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                💡 <strong>Pro Tip:</strong> Connect integrations to unlock advanced features like traffic forecasting, 
                competitor tracking, and AI visibility monitoring.
              </p>
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