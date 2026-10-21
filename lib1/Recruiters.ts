import { soql } from "./salesforce-rest.ts";

const recruiterFields = [
  "Id",
  "Recruiter_ID__c",
  "Name",
  "Role__c",
  "Sector_Specialisation__c",
  "Availability_Status__c",
] as const;

export type Recruiter = {
  Id: string;
  Name: string;
  Recruiter_ID__c: string | null;
  Role__c?: string | null;
  Sector_Specialisation__c?: string | null;
  Availability_Status__c?: string | null;
};

export async function getRecruiters(): Promise<Recruiter[]> {
  return soql<Recruiter>(
    `SELECT ${recruiterFields.join(", ")} FROM Recruiter__c`,
  );
}
