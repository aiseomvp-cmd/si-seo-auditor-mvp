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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.websiteUrl || !formData.targetQuestions) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Call the edge function to create audit
      const { data, error } = await supabase.functions.invoke('create-seo-audit', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Audit Started!",
        description: "Your SEO audit is now being processed.",
        className: "border-green-200 bg-green-50 text-green-900",
      });

      // Navigate to project progress with the audit ID
      navigate(`/projects/${data.auditId}/progress`);

    } catch (error) {
      console.error('Error creating audit:', error);
      toast({
        title: "Error",
        description: "Failed to start audit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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