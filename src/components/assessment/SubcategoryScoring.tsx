import React, { useState, useEffect } from 'react';
import { RubricSubcategory, AssessmentScoreInput } from '../../types';
import { useAssessmentStore } from '../../store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ScoreSelector } from './ScoreSelector';
import { ConfidenceSelector } from './ConfidenceSelector';

interface SubcategoryScoringProps {
  assessmentId: string;
  categoryId: string;
  subcategory: RubricSubcategory;
  onScoreSaved?: () => void;
}

export function SubcategoryScoring({ 
  assessmentId, 
  categoryId, 
  subcategory, 
  onScoreSaved 
}: SubcategoryScoringProps) {
  const { getScore, saveScore } = useAssessmentStore();
  const [selectedScore, setSelectedScore] = useState<number | undefined>();
  const [comments, setComments] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState(3);
  const [saving, setSaving] = useState(false);

  // Load existing score
  useEffect(() => {
    const existingScore = getScore(assessmentId, subcategory.id);
    if (existingScore) {
      setSelectedScore(existingScore.score);
      setComments(existingScore.comments || '');
      setConfidenceLevel(existingScore.confidence_level || 3);
    }
  }, [assessmentId, subcategory.id, getScore]);

  const handleSave = async () => {
    if (selectedScore === undefined) return;

    setSaving(true);
    try {
      const scoreInput: AssessmentScoreInput = {
        category_id: categoryId,
        subcategory_id: subcategory.id,
        score: selectedScore,
        comments: comments.trim(),
        confidence_level: confidenceLevel,
      };

      await saveScore(assessmentId, scoreInput);
      onScoreSaved?.();
    } catch (error) {
      console.error('Failed to save score:', error);
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = () => {
    const existingScore = getScore(assessmentId, subcategory.id);
    if (!existingScore && selectedScore !== undefined) return true;
    if (!existingScore) return false;
    
    return (
      existingScore.score !== selectedScore ||
      (existingScore.comments || '') !== comments.trim() ||
      (existingScore.confidence_level || 3) !== confidenceLevel
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{subcategory.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>Weight: {subcategory.weight}%</span>
              {getScore(assessmentId, subcategory.id) && (
                <span className="text-green-600 font-medium">✓ Scored</span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Score Selection */}
          <ScoreSelector
            criteria={subcategory.scoring_criteria}
            selectedScore={selectedScore}
            onScoreSelect={setSelectedScore}
          />

          {/* Comments */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Comments & Rationale:
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide rationale for your score and any additional context..."
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
            />
          </div>

          {/* Confidence Level */}
          <ConfidenceSelector
            value={confidenceLevel}
            onChange={setConfidenceLevel}
          />

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              onClick={handleSave}
              disabled={selectedScore === undefined || !hasChanges()}
              loading={saving}
            >
              {getScore(assessmentId, subcategory.id) ? 'Update Score' : 'Save Score'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}