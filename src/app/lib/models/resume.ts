export type Resume = {
    name?: string;
    email?: string;
    tagline?: string;
    title?: string;
    bio?: string;
    location?: GeoLocation;
    skills?: string[];
    experience?: Experience[];
    education?: Education[];
    projects?: Project[];
    phoneNumber?: string;
    websites?: Website[];
    certifications?: Certification[];
    languages?: UserLanguage[];
    createdAt: Date;
    updatedAt: Date;
};

export type Website = {
    url: string;
    title: string;
};

export type Experience = {
    id: string;
    company: string;
    title: string;
    startDate: string;
    endDate?: string;
    description?: string;
};

export type Education = {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
};

export type Certification = {
    id: string;
    name: string;
    issuer?: string;
    issueDate?: string;
    expirationDate?: string;
    credentialUrl?: string;
};

export type Project = {
    id: string;
    name: string;
    projectType?: string;
    description?: string;
    tags?: string[];
    workSampleUrl?: string;
    previewUrl?: string;
};

export type tag = {
    name: string;
};

export type GeoLocation = {
    country: string;
    countryCode: string;
    state: string;
    city: string;
};

export type UserLanguage = {
    id: string;
    code: string;
    name: string;
    level: string;
};
