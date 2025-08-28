import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    websiteUrl: "",
    region: "",
    audience: "",
    targetQuestions: "",
    competitorDomains: "",
    useSEMrush: false,
    enableGA4: false,
    enableGSC: false,
    enableOtherAPI: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a mock project ID
    const projectId = Math.random().toString(36).substr(2, 9);

    toast({
      title: "Audit Started!",
      description: "Your SEO audit is now being processed.",
      className: "border-green-200 bg-green-50 text-green-900",
    });

    navigate(`/projects/${projectId}/progress`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">
            AI-SEO Audit
          </h1>
          <div className="wavy-divider w-32 mx-auto mb-6"></div>
          <p className="text-xl text-white font-heading">
            Empowering Healthcare SEO in the Age of AI
          </p>
        </div>

        {/* Project Form */}
        <GradientCard className="max-w-5xl mx-auto" elevated>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="websiteUrl" className="text-base font-semibold">
                    Website URL *
                  </Label>
                  <Input
                    id="websiteUrl"
                    placeholder="e.g. example.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="region" className="text-base font-semibold">
                    Region
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, region: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="apac">APAC</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience" className="text-base font-semibold">
                    Target Audience
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, audience: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hcp">Healthcare Professionals (HCP)</SelectItem>
                      <SelectItem value="patient">Patients</SelectItem>
                      <SelectItem value="both">Both HCP & Patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    id="semrush"
                    checked={formData.useSEMrush}
                    onCheckedChange={(checked) => setFormData({...formData, useSEMrush: checked})}
                  />
                  <Label htmlFor="semrush" className="text-base font-semibold">
                    Use SEMrush Analysis
                  </Label>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="targetQuestions" className="text-base font-semibold">
                    Target Questions *
                  </Label>
                  <p className="text-sm text-brand-dark mb-2">
                    What should AI answer about your brand? One question per line, min 10
                  </p>
                  <Textarea
                    id="targetQuestions"
                    placeholder="What is the efficacy of [drug name]?&#10;How does [treatment] compare to alternatives?&#10;What are the side effects of [medication]?"
                    value={formData.targetQuestions}
                    onChange={(e) => setFormData({...formData, targetQuestions: e.target.value})}
                    rows={8}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="competitorDomains" className="text-base font-semibold">
                    Competitor Domains (Optional)
                  </Label>
                  <p className="text-sm text-brand-dark mb-2">
                    domain.com, one per line
                  </p>
                  <Textarea
                    id="competitorDomains"
                    placeholder="competitor1.com&#10;competitor2.com&#10;competitor3.com"
                    value={formData.competitorDomains}
                    onChange={(e) => setFormData({...formData, competitorDomains: e.target.value})}
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Future Integrations */}
            <div>
              <h3 className="text-lg font-heading font-semibold mb-4 text-brand-dark">
                Future Integrations
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="ga4"
                    checked={formData.enableGA4}
                    onCheckedChange={(checked) => setFormData({...formData, enableGA4: !!checked})}
                  />
                  <Label htmlFor="ga4" className="text-sm text-brand-dark">
                    GA4 Audit (coming soon)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="gsc"
                    checked={formData.enableGSC}
                    onCheckedChange={(checked) => setFormData({...formData, enableGSC: !!checked})}
                  />
                  <Label htmlFor="gsc" className="text-sm text-brand-dark">
                    GSC Import (coming soon)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="otherapi"
                    checked={formData.enableOtherAPI}
                    onCheckedChange={(checked) => setFormData({...formData, enableOtherAPI: !!checked})}
                  />
                  <Label htmlFor="otherapi" className="text-sm text-brand-dark">
                    Other API (future expansion)
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={isSubmitting}
                className="px-12 py-4 text-lg"
              >
                {isSubmitting ? "Starting Audit..." : "Start Audit"}
              </Button>
            </div>
          </form>
        </GradientCard>
      </main>

      <Footer />
    </div>
  );
};

export default NewProject;