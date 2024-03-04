 // helper-files/content-interface.ts

 export interface Content {
    id: number  | null;
    title: string;
    description: string;
    creator: string;
    img?: string;
    type?: string;
    tags?: string[];
  }
  
  
   