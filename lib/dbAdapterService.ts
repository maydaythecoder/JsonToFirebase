export const connectToDatabase = async (dbType: string): Promise<string> => {
    // Connect to the database
    return `Connected to ${dbType}`;
  };
  