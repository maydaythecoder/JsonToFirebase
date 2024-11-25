declare global {
    interface ConversionRequest {
      data: string;
      format: string;
    }
  
    interface ApiGenerationRequest {
      data: string;
      language: string;
    }
  }
  