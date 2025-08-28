import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, TrendingUp, Zap, BarChart3, Brain } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Visibility Analysis",
      description: "Test how AI systems like ChatGPT and Perplexity cite your healthcare content",
      color: "text-brand-blue",
    },
    {
      icon: Target,
      title: "Healthcare SEO Audit",
      description: "Specialized SEO analysis for pharmaceutical and medical device companies",
      color: "text-brand-teal",
    },
    {
      icon: TrendingUp,
      title: "Competitive Intelligence",
      description: "See how competitors rank for key healthcare queries and identify gaps",
      color: "text-brand-lime",
    },
    {
      icon: Zap,
      title: "Quick Wins Identification",
      description: "Get prioritized recommendations for immediate SEO improvements",
      color: "text-orange-500",
    },
  ];

  const stats = [
    { number: "500+", label: "Healthcare Sites Analyzed" },
    { number: "85%", label: "Average SEO Score Improvement" },
    { number: "3x", label: "Faster AI Citation Discovery" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-cta text-white font-semibold px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Indegene Hackathon Demo
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gradient">
              AI-SEO Audit Platform
            </h1>
            
            <div className="wavy-divider w-32 mx-auto mb-6"></div>
            
            <p className="text-xl md:text-2xl text-white font-heading mb-8 leading-relaxed">
              Empowering Healthcare SEO in the Age of AI
            </p>
            
            <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
              The first platform designed specifically for healthcare marketers to understand and optimize 
              their digital presence in AI-driven search environments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/projects/new">
                <Button variant="cta" size="lg" className="px-8 py-4 text-lg">
                  Start Free Audit
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Sample Report
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-card py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-brand-blue count-up mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium text-brand-dark">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              Why Healthcare Needs Specialized SEO
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Traditional SEO tools don't understand healthcare regulations, AI citation patterns, 
              or the unique challenges of medical content optimization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GradientCard key={index} elevated className="text-center">
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-lg font-heading font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-dark/70">
                  {feature.description}
                </p>
              </GradientCard>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section className="bg-gradient-header py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                See It In Action
              </h2>
              <p className="text-xl text-white/90 mb-8">
                This demo showcases real healthcare SEO challenges and AI-powered solutions. 
                No signup required—dive right into the platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects/new">
                  <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Try Demo Audit
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-brand-blue">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Features Tour
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <GradientCard className="max-w-3xl mx-auto" elevated>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gradient">
              Ready to Optimize for the AI Era?
            </h2>
            <p className="text-lg text-brand-dark/70 mb-8">
              Join forward-thinking healthcare marketers who are already preparing for AI-driven search.
            </p>
            <Link to="/projects/new">
              <Button variant="cta" size="lg" className="px-12 py-4 text-lg">
                Start Your Free Audit Now
              </Button>
            </Link>
          </GradientCard>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
