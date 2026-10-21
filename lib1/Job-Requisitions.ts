import { readRecord, soql } from "./salesforce-rest.ts";

const requisitionFields = [
  "Breach_Time__c",
  "Job_Requisition__r.Name",
  "Job_Requisition__r.Closure_Note__c",
  "Job_Requisition__r.Employment_Type__c",
  "Job_Requisition__r.Job_Title__c",
  "Job_Requisition__r.Location__c",
  "Job_Requisition__r.Origin__c",
  "Job_Requisition__r.Priority__c",
  "Job_Requisition__r.Requisition_Number__c",
  "Job_Requisition__r.Role_Category__c",
  "Job_Requisition__r.Salary_Range__c",
  "Job_Requisition__r.Status__c",
  "Job_Requisition__r.Description__c",
  "End_Time__c",
  "Name",
  "Shortlist_Delivery_Target_Minutes__c",
  "SLA_ID__c",
  "SLA_Status__c",
  "Start_Time__c",
  "Time_To_Fill_Target_Minutes__c",
  "Elapsed_Minutes__c",
] as const;

export type JobRequisitionRow = {
  Id: string;
  Breach_Time__c?: string | null;
  Job_Requisition__r: {
    Name: string;
    Closure_Note__c?: string | null;
    Employment_Type__c?: string | null;
    Job_Title__c?: string | null;
    Location__c?: string | null;
    Origin__c?: string | null;
    Priority__c?: string | null;
    Requisition_Number__c: string;
    Role_Category__c?: string | null;
    Salary_Range__c?: string | null;
    Status__c?: string | null;
    Description__c?: string | null;
    Recruiter__r: { Name: string };
  };
  End_Time__c?: string | null;
  Name?: string | null;
  Shortlist_Delivery_Target_Minutes__c?: number | null;
  SLA_ID__c?: string | null;
  SLA_Status__c?: string | null;
  Start_Time__c?: string | null;
  Time_To_Fill_Target_Minutes__c: number;
  Elapsed_Minutes__c: number;
};

export async function getJobRequisitions(): Promise<JobRequisitionRow[]> {
  return soql<JobRequisitionRow>(
    `SELECT ${requisitionFields.join(", ")} FROM SLA__c`,
  );
}

export async function getClientName(clientId: string): Promise<string | null> {
  if (!/^[a-zA-Z0-9]{15}(?:[a-zA-Z0-9]{3})?$/.test(clientId)) {
    return null;
  }

  const client = await readRecord("Client__c", clientId, ["Name"]);
  const name = client?.Name;
  return typeof name === "string" ? name : null;
}

/** Returns client records as a Map keyed by Client__c.Id with their Name. */
export async function getClientMap(): Promise<Map<string, string>> {
  const clients = await soql<{ Id: string; Name: string }>(
    "SELECT Id, Name FROM Client__c",
  );

  return new Map(
    clients
      .filter(
        (client) =>
          typeof client.Id === "string" && typeof client.Name === "string",
      )
      .map((client) => [client.Id, client.Name]),
  );
}
