import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientCard } from "@/components/ui/GradientCard";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2 } from "lucide-react";

const steps = [
  { name: "Crawl", description: "Analyzing website structure", icon: "🕷️" },
  { name: "Competitors", description: "Researching competitive landscape", icon: "🔍" },
  { name: "SEO", description: "Evaluating SEO performance", icon: "📊" },
  { name: "AI", description: "Testing AI visibility", icon: "🤖" },
  { name: "Gaps", description: "Identifying opportunities", icon: "💡" },
];

const dataSources = [
  { name: "Playwright", logo: "🎭", completed: false },
  { name: "Perplexity", logo: "🔮", completed: false },
  { name: "GA4", logo: "📈", completed: false },
  { name: "GSC", logo: "🔍", completed: false },
];

const ProjectProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSources, setCompletedSources] = useState<boolean[]>([false, false, false, false]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate(`/projects/${id}/overview`), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });

      // Update steps and sources
      setCurrentStep(Math.min(Math.floor(progress / 20), 4));
      
      setCompletedSources(prev => 
        prev.map((completed, idx) => 
          completed || progress > (idx + 1) * 20 + Math.random() * 10
        )
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [id, navigate, progress]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold mb-4 text-white">
            Audit in Progress
          </h1>
          <div className="wavy-divider w-24 mx-auto"></div>
        </div>

        <GradientCard className="mb-8" elevated>
          <div className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-brand-dark">Overall Progress</span>
                <span className="text-sm text-brand-dark/70">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.name} className="text-center">
                  <div className={`
                    w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-lg
                    ${index <= currentStep ? 'bg-gradient-cta text-white' : 'bg-muted text-muted-foreground'}
                    transition-all duration-500
                  `}>
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : index === currentStep ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-brand-dark">{step.name}</h3>
                  <p className="text-xs text-brand-dark/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </GradientCard>

        {/* Status Card */}
        <GradientCard className="text-center shimmer">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-2 text-brand-dark">
                Your site is being analyzed!
              </h2>
              <p className="text-brand-dark/70">
                This usually takes 3-5 minutes. Feel free to close this tab—we'll email your results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand-dark">Fetching data from:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dataSources.map((source, index) => (
                  <div key={source.name} className="flex flex-col items-center space-y-2">
                    <div className={`
                      w-16 h-16 rounded-lg flex items-center justify-center text-2xl
                      ${completedSources[index] ? 'bg-success/20 border-success' : 'bg-muted border-muted-foreground/20'}
                      border-2 transition-all duration-500
                    `}>
                      {completedSources[index] ? (
                        <CheckCircle className="w-8 h-8 text-success" />
                      ) : (
                        <span>{source.logo}</span>
                      )}
                    </div>
                    <span className="font-mono text-sm text-brand-dark">{source.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GradientCard>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectProgress;