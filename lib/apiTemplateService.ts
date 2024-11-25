export const generateApi = async (data: string, language: string): Promise<string> => {
    switch (language) {
      case 'JavaScript':
        return `export const fetchData = async () => {
    return ${data};
  };`;
      case 'Python':
        return `def fetch_data():\n    return ${data}`;
      default:
        throw new Error('Unsupported language');
    }
  };
  