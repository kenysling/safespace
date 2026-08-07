export type PropertyType = 'HDB_BTO' | 'HDB_RESALE' | 'CONDO' | 'LANDED' | 'COMMERCIAL';

export type DesignStyle =
  | 'JAPANDI'
  | 'MODERN_MINIMALIST'
  | 'SCANDINAVIAN'
  | 'LUXURY_MODERN'
  | 'INDUSTRIAL'
  | 'WABI_SABI'
  | 'CONTEMPORARY'
  | 'COASTAL'
  | 'FARMHOUSE';

export type RedFlagLevel = 'LOW_RISK' | 'MODERATE_CAUTION' | 'HIGH_RISK_ALERT';

export interface TrustScoreBreakdown {
  acraIntegrity: number; // 0-100
  credentialsAndLicensing: number; // 0-100
  financialStability: number; // 0-100
  verifiedCustomerReviews: number; // 0-100
  disputeAndCourtRecord: number; // 0-100
}

export interface PortfolioProject {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  renovationCostSGD: number;
  completionYear: number;
  durationWeeks: number;
  style: DesignStyle;
  coverImage: string;
  galleryImages: string[];
  description: string;
}

export interface VerifiedReview {
  id: string;
  homeownerName: string;
  propertyType: string;
  estateLocation: string;
  propertyOwnershipVerified: boolean; // Homeowner submitted title deed / Singpass HDB proof
  verifiedDate: string;
  rating: number; // 1-5
  workmanshipScore: number;
  timelineAdherenceScore: number;
  budgetTransparencyScore: number;
  serviceScore: number;
  comment: string;
  projectCostSGD: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  logoUrl: string;
  heroImageUrl: string;
  tagline: string;
  uen: string;
  incorporationYear: number;
  paidUpCapitalSGD: number;
  hdbRegistrationNo: string | null;
  hdbStatus: 'REGISTERED' | 'EXPIRED' | 'SUSPENDED' | 'NOT_APPLICABLE';
  caseTrustAccredited: boolean;
  caseTrustPolicyNo?: string;
  bcaGrade?: string;
  overallTrustScore: number; // 0-100
  trustScoreBreakdown: TrustScoreBreakdown;
  redFlagRating: RedFlagLevel;
  redFlags: string[];
  rating: number; // 1-5
  reviewCount: number;
  projectTypes: PropertyType[];
  designStyles: DesignStyle[];
  priceRangeSGD: { min: number; max: number };
  completedProjectsCount: number;
  officeAddress: string;
  contactPhone: string;
  contactEmail: string;
  websiteUrl: string;
  portfolios: PortfolioProject[];
  verifiedReviews: VerifiedReview[];
  aiSummary: {
    strengths: string[];
    watchouts: string[];
    accreditationNotes: string;
  };
}

export interface QuotationLineItem {
  id: string;
  category: 'Carpentry' | 'Hacking & Masonry' | 'Electrical' | 'Plumbing' | 'Painting' | 'Ceiling & Partition' | 'Polishing & Cleaning' | 'Misc & Permits';
  description: string;
  quantity: number;
  unit: string;
  unitPriceSGD: number;
  totalPriceSGD: number;
  riskNote?: string;
  isRedFlag?: boolean;
}

export interface QuoteComparison {
  id: string;
  companyName: string;
  quoteTotalSGD: number;
  depositSchedule: string;
  warrantyPeriodMonths: number;
  lineItems: QuotationLineItem[];
  aiRiskScore: number;
  aiRedFlags: string[];
}

export interface MatchingPreferences {
  propertyType: PropertyType;
  estateName: string;
  rooms: string;
  floorAreaSqft: number;
  budgetSGD: number;
  targetStyle: DesignStyle;
  keyPriorities: string[];
  targetMoveInMonths: number;
}

export interface HomeownerProfile {
  id: string;
  name: string;
  email: string;
  propertyAddress: string;
  propertyOwnershipVerified: boolean;
  shortlistedCompanyIds: string[];
  savedQuotes: QuoteComparison[];
}
