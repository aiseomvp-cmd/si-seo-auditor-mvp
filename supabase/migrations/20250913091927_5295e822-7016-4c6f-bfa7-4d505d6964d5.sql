-- Create table for storing SEO audit data
CREATE TABLE public.seo_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  website_url TEXT NOT NULL,
  audit_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.seo_audits ENABLE ROW LEVEL SECURITY;

-- Create policies for user access (for now, allow public access since no auth is implemented)
CREATE POLICY "Anyone can view audits" 
ON public.seo_audits 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create audits" 
ON public.seo_audits 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update audits" 
ON public.seo_audits 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_seo_audits_updated_at
BEFORE UPDATE ON public.seo_audits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance
CREATE INDEX idx_seo_audits_website_url ON public.seo_audits(website_url);
CREATE INDEX idx_seo_audits_created_at ON public.seo_audits(created_at DESC);