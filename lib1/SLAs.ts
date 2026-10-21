import { soql } from "./salesforce-rest.ts";

const slaFields = [
  "Id",
  "Breach_Time__c",
  "Job_Requisition__r.Name",
  "End_Time__c",
  "Name",
  "Shortlist_Delivery_Target_Minutes__c",
  "SLA_ID__c",
  "SLA_Status__c",
  "Start_Time__c",
  "Time_To_Fill_Target_Minutes__c",
  "Elapsed_Minutes__c",
] as const;

export type SLA = {
  Id: string;
  Breach_Time__c?: string | null;
  Job_Requisition__r: { Name: string };
  End_Time__c?: string | null;
  Name?: string | null;
  Shortlist_Delivery_Target_Minutes__c?: number | null;
  SLA_ID__c?: string | null;
  SLA_Status__c?: string | null;
  Start_Time__c?: string | null;
  Time_To_Fill_Target_Minutes__c?: number | null;
  Elapsed_Minutes__c?: number | null;
};

export async function getSLAs(): Promise<SLA[]> {
  return soql<SLA>(`SELECT ${slaFields.join(", ")} FROM SLA__c`);
}
