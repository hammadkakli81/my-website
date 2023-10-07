interface OneDescPoints {
  name: string;
  furtherDesc: string[];
}

export interface Training {
  _id: string;
  name: string;
  excerptDesc: string;
  description: OneDescPoints[];
  slug: string;
}
