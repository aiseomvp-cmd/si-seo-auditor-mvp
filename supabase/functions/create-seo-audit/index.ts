import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { websiteUrl, region, audience, targetQuestions, competitorDomains, useSEMrush } = await req.json();

    console.log('Creating SEO audit for:', websiteUrl);

    // Parse target questions
    const questions = targetQuestions.split('\n').filter((q: string) => q.trim().length > 0);
    
    // Parse competitor domains
    const competitors = competitorDomains ? 
      competitorDomains.split('\n').filter((d: string) => d.trim().length > 0) : 
      [];

    // Generate realistic audit data
    const auditData = generateAuditData(websiteUrl, region, audience, questions, competitors, useSEMrush);

    // Save to database
    const { data, error } = await supabase
      .from('seo_audits')
      .insert({
        website_url: websiteUrl,
        audit_data: auditData
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving audit:', error);
      throw error;
    }

    console.log('Audit saved successfully:', data.id);

    return new Response(JSON.stringify({ 
      success: true, 
      auditId: data.id,
      auditData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-seo-audit function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateAuditData(websiteUrl: string, region: string, audience: string, questions: string[], competitors: string[], useSEMrush: boolean) {
  // Generate realistic SEO scores
  const seoScore = Math.floor(Math.random() * 30) + 60; // 60-90
  const aiCitationScore = Math.floor(Math.random() * 40) + 40; // 40-80
  const criticalIssues = Math.floor(Math.random() * 10) + 3; // 3-12

  // Generate traffic trend data (6 months)
  const baseTraffic = Math.floor(Math.random() * 500) + 800;
  const trafficTrend = Array.from({ length: 6 }, () => 
    baseTraffic + Math.floor(Math.random() * 100) - 50
  );

  // Generate competitor SEO issues
  const competitorSeoIssues: Record<string, any[]> = {};
  competitors.forEach(competitor => {
    competitorSeoIssues[competitor] = generateCompetitorIssues(competitor);
  });

  // Generate AI visibility comparison
  const aiVisibilityComparison = [
    {
      domain: websiteUrl,
      citations: Math.floor(Math.random() * 30) + 15,
      SERP_mentions: Math.floor(Math.random() * 35) + 20
    },
    ...competitors.map(competitor => ({
      domain: competitor,
      citations: Math.floor(Math.random() * 50) + 25,
      SERP_mentions: Math.floor(Math.random() * 60) + 30
    }))
  ];

  return {
    input: {
      website: websiteUrl,
      region,
      audience,
      targetQuestions: questions,
      competitors
    },
    audit: {
      seoScore,
      aiCitationScore,
      criticalIssues,
      trafficTrend,
      opportunityGaps: generateOpportunityGaps(websiteUrl),
      seoIssues: generateSeoIssues(websiteUrl),
      competitorSeoIssues,
      aiVisibility: {
        comparison: aiVisibilityComparison,
        topQuestionsPerformance: generateTopQuestionsPerformance(websiteUrl, questions, competitors)
      },
      quickWins: generateQuickWins(),
      forecast: {
        currentTraffic: trafficTrend,
        projectedUplift: trafficTrend.map(traffic => Math.floor(traffic * 1.2))
      }
    },
    settings: {
      mailNotifications: {
        enabled: true,
        frequency: ["weekly", "monthly"],
        recipients: ["user@example.com"],
        attachAuditFile: true
      },
      downloadOption: true,
      apiPlaceholders: {
        awsBedrock: "<BEDROCK_API_KEY_PLACEHOLDER>",
        otherAPIs: ["<GA4_PLACEHOLDER>", "<GSC_PLACEHOLDER>"]
      }
    },
    meta: {
      lastUpdated: new Date().toISOString()
    }
  };
}

function generateOpportunityGaps(website: string) {
  const gaps = [
    {
      issue: "Missing FAQ schema for key medical questions",
      page: "/faq",
      impact: "High",
      effort: "Low",
      recommendation: "Add FAQ Structured Data for all medical questions",
      quickWin: true
    },
    {
      issue: "Brand does not appear in AI/LLM citations for treatment topics",
      page: "/treatments",
      impact: "High",
      effort: "Medium",
      recommendation: "Optimize pages for AI visibility with targeted content and structured data",
      quickWin: false
    },
    {
      issue: "Competitors ranking for clinical trial searches",
      page: "/clinical-trials",
      impact: "Medium",
      effort: "Medium",
      recommendation: "Add regularly updated clinical trials widget and optimize metadata",
      quickWin: false
    }
  ];

  return gaps.slice(0, Math.floor(Math.random() * 3) + 2);
}

function generateSeoIssues(website: string) {
  const allIssues = [
    {
      issue: "Mobile site speed is below industry benchmark",
      page: "/",
      impact: "High",
      recommendation: "Enable caching, optimize images, and reduce JS payload"
    },
    {
      issue: "Missing XML sitemap",
      page: "/",
      impact: "Medium",
      recommendation: "Generate and submit an XML sitemap to Google Search Console"
    },
    {
      issue: "Missing alt attributes for images in patient education resources",
      page: "/education/patient-resources",
      impact: "Medium",
      recommendation: "Add descriptive alt text for accessibility and SEO"
    },
    {
      issue: "Title tags are missing for some subpages",
      page: "/resources/",
      impact: "Low",
      recommendation: "Add unique, keyword-rich title tags"
    },
    {
      issue: "Duplicate meta descriptions detected",
      page: "/products/",
      impact: "Medium",
      recommendation: "Ensure all meta descriptions are unique and descriptive"
    },
    {
      issue: "Low text-to-HTML ratio on product pages",
      page: "/products/",
      impact: "Medium",
      recommendation: "Add more original content to product detail sections"
    }
  ];

  return allIssues.slice(0, Math.floor(Math.random() * 4) + 2);
}

function generateCompetitorIssues(competitor: string) {
  const issues = [
    {
      issue: "Missing FAQ structured data for research topics",
      page: "/research/faq",
      impact: "High",
      recommendation: "Add FAQ schema to top-cited research topics pages"
    },
    {
      issue: "Large JavaScript files delay LCP",
      page: "/",
      impact: "High",
      recommendation: "Code split and defer non-critical JS"
    },
    {
      issue: "Duplicate meta descriptions on trial pages",
      page: "/clinical-trials/",
      impact: "Medium",
      recommendation: "Ensure all meta descriptions are unique and descriptive"
    },
    {
      issue: "Low text-to-HTML ratio on product detail pages",
      page: "/products/",
      impact: "Medium",
      recommendation: "Add more original content to sections"
    },
    {
      issue: "No breadcrumbs implemented",
      page: "/",
      impact: "Low",
      recommendation: "Implement breadcrumbs for better UX and crawlability"
    }
  ];

  return issues.slice(0, Math.floor(Math.random() * 3) + 2);
}

function generateTopQuestionsPerformance(website: string, questions: string[], competitors: string[]) {
  return questions.slice(0, 5).map(question => {
    const topCompetitor = competitors[Math.floor(Math.random() * competitors.length)] || 'competitor.com';
    return {
      question,
      [website.replace(/[^a-zA-Z0-9]/g, '')]: {
        rank: Math.floor(Math.random() * 5) + 3,
        citations: Math.floor(Math.random() * 3) + 1
      },
      topCompetitor: {
        domain: topCompetitor,
        rank: Math.floor(Math.random() * 2) + 1,
        citations: Math.floor(Math.random() * 5) + 3
      }
    };
  });
}

function generateQuickWins() {
  return [
    "Add FAQPage schema for all key medical questions",
    "Submit XML sitemap and fix crawling issues",
    "Improve mobile speed by optimizing images and deferring non-critical JS",
    "Enhance content for top 3 non-branded treatment questions",
    "Increase internal linking between patient resources and HCP landing pages",
    "Update alt attributes for all education resource images",
    "Add rich snippets for clinical trials and case studies",
    "Monitor AI/LLM citations monthly for new questions and topics"
  ];
}