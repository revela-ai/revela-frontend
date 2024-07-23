export interface Analysis {
    faces: {
      skin_tone: string;
      tone_label: string;
      accuracy: number;
      dominant_colors: {
        color: string;
        percent: number;
      }[];
    }[];
    skin_type: [string, number];
    skin_age: [string, number];
    skin_acne: [string, number];
    skin_wrinkle: [string, number];
    analysis_id: number;
  }
  