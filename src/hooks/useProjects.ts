import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  client: string;
  description: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  teamMembers: string[];
  hourlyBudget: number;
  hoursSpent: number;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedProjects: Project[] = data.map(project => ({
        id: project.id,
        organizationId: project.organization_id,
        name: project.name,
        client: project.client,
        description: project.description,
        budget: project.budget,
        spent: project.spent,
        startDate: project.start_date,
        endDate: project.end_date,
        status: project.status as Project['status'],
        teamMembers: project.team_members,
        hourlyBudget: project.hourly_budget,
        hoursSpent: project.hours_spent,
        priority: project.priority as Project['priority'],
        tags: project.tags,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      }));

      setProjects(mappedProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          organization_id: projectData.organizationId,
          name: projectData.name,
          client: projectData.client,
          description: projectData.description,
          budget: projectData.budget,
          spent: projectData.spent,
          start_date: projectData.startDate,
          end_date: projectData.endDate,
          status: projectData.status,
          team_members: projectData.teamMembers,
          hourly_budget: projectData.hourlyBudget,
          hours_spent: projectData.hoursSpent,
          priority: projectData.priority,
          tags: projectData.tags
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchProjects();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          organization_id: updates.organizationId,
          name: updates.name,
          client: updates.client,
          description: updates.description,
          budget: updates.budget,
          spent: updates.spent,
          start_date: updates.startDate,
          end_date: updates.endDate,
          status: updates.status,
          team_members: updates.teamMembers,
          hourly_budget: updates.hourlyBudget,
          hours_spent: updates.hoursSpent,
          priority: updates.priority,
          tags: updates.tags,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
}