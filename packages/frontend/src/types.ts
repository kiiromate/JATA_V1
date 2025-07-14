export interface Application {
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  dateApplied: string;
}