export const validateImageUrl = async (url: string): Promise<string> => {
    const img = new Image();
    const defaultImageUrl = 'https://c0.wallpaperflare.com/preview/386/354/385/analysis-hospital-doctor-medical.jpg'; 
    const checkImage = (url: string): Promise<boolean> => {
      return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };
  
    const isValidImage = await checkImage(url);
  
    return isValidImage ? url : defaultImageUrl;
  };
  