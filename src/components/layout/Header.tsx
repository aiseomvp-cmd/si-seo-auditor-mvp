import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-header shadow-header">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div className="text-white">
              <h1 className="font-heading font-bold text-xl">AI-SEO Audit</h1>
              <p className="text-xs text-white/80">Indegene NexGen AI Surfers</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/projects/new" 
              className="text-white/80 hover:text-white transition-colors"
            >
              New Audit
            </Link>
            <Link 
              to="/" 
              className="text-white/80 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};