-- Fix critical security vulnerability: Add user-based access control to all tables

-- First, add user_id column to projects table to link projects to users
ALTER TABLE public.projects ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to ai_results table
ALTER TABLE public.ai_results ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to gap_actions table  
ALTER TABLE public.gap_actions ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to target_questions table
ALTER TABLE public.target_questions ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing public access policies
DROP POLICY IF EXISTS "Public Access" ON public.projects;
DROP POLICY IF EXISTS "Public Access" ON public.ai_results;  
DROP POLICY IF EXISTS "Public Access" ON public.gap_actions;
DROP POLICY IF EXISTS "Public Access" ON public.target_questions;

-- Create secure user-based RLS policies for projects table
CREATE POLICY "Users can view their own projects" 
ON public.projects 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" 
ON public.projects 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
ON public.projects 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Create secure RLS policies for ai_results table
CREATE POLICY "Users can view their own ai_results" 
ON public.ai_results 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ai_results" 
ON public.ai_results 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_results" 
ON public.ai_results 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ai_results" 
ON public.ai_results 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Create secure RLS policies for gap_actions table
CREATE POLICY "Users can view their own gap_actions" 
ON public.gap_actions 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own gap_actions" 
ON public.gap_actions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gap_actions" 
ON public.gap_actions 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gap_actions" 
ON public.gap_actions 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Create secure RLS policies for target_questions table
CREATE POLICY "Users can view their own target_questions" 
ON public.target_questions 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own target_questions" 
ON public.target_questions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own target_questions" 
ON public.target_questions 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own target_questions" 
ON public.target_questions 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);