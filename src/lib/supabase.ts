import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const db = {
  // Users
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();
    
    return data;
  },

  // Applications
  async getApplications() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getApplication(id: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Rubrics
  async getRubrics() {
    const { data, error } = await supabase
      .from('rubrics')
      .select(`
        *,
        rubric_categories (
          *,
          rubric_subcategories (*)
        )
      `)
      .eq('is_active', true)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getRubric(id: string) {
    const { data, error } = await supabase
      .from('rubrics')
      .select(`
        *,
        rubric_categories (
          *,
          rubric_subcategories (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Assessments
  async getAssessmentsForUser(userId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select(`
        *,
        applications (*),
        rubrics (*)
      `)
      .eq('assessor_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAssessment(id: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select(`
        *,
        applications (*),
        rubrics (
          *,
          rubric_categories (
            *,
            rubric_subcategories (*)
          )
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAssessment(id: string, updates: any) {
    const { data, error } = await supabase
      .from('assessments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Assessment Scores
  async getAssessmentScores(assessmentId: string) {
    const { data, error } = await supabase
      .from('assessment_scores')
      .select('*')
      .eq('assessment_id', assessmentId);
    
    if (error) throw error;
    return data;
  },

  async upsertAssessmentScore(score: any) {
    const { data, error } = await supabase
      .from('assessment_scores')
      .upsert(score, { onConflict: 'assessment_id,subcategory_id' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Assessment Evidence
  async getAssessmentEvidence(assessmentId: string) {
    const { data, error } = await supabase
      .from('assessment_evidence')
      .select('*')
      .eq('assessment_id', assessmentId);
    
    if (error) throw error;
    return data;
  },

  async uploadEvidence(file: File, assessmentId: string, categoryId: string, description?: string) {
    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${assessmentId}/${categoryId}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('assessment-evidence')
      .upload(fileName, file);
    
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('assessment-evidence')
      .getPublicUrl(fileName);
    
    // Save evidence record
    const currentUser = await this.getCurrentUser();
    const { data, error } = await supabase
      .from('assessment_evidence')
      .insert({
        assessment_id: assessmentId,
        category_id: categoryId,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        description: description || '',
        uploaded_by: currentUser?.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};