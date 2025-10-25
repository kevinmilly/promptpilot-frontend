export interface ModelMetadata {
  provider: string;
  name: string;
  version?: string;
  pricing?: {
    per1KTokens: number;
    currency: string;
  };
}

export interface ModelInsights {
  tokenCount: number;
  wordCount: number;
  estimatedCostUSD: number;
  tone: string;
  readability: number;
  coherence: number;
}


export interface ModelResult {
  model: string;
  text: string;
  tokens: number;
  latency: number;
  metadata: ModelMetadata;
  insights?: ModelInsights;
}