interface OneDescPoints {
  name: string;
  furtherDesc: string[];
}

export interface Training {
  name: string;
  excerptDesc: string;
  description: OneDescPoints[];
  slug: string;
}
