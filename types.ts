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
    skin_type: [string, number, string];
    skin_age: [string, number, string];
    skin_acne: [string, number, string];
    skin_wrinkle: [string, number, string];
    analysis_id: number;
  }
  