// import { getSLAs } from "./lib/SLAs.ts";
import { config } from "./lib/agent-config.ts";
import { soql } from "./lib/salesforce-rest.ts";
export const SF_API_VERSION = "v64.0";
const SF_MY_DOMAIN_URL =
  "https://orgfarm-17938a289a-dev-ed.develop.my.salesforce.com";
const SF_API_BASE = "https://api.salesforce.com";
let SF_CONSUMER_KEY =
  "3MVG9JJwBBbcN47IrPNkgFsXdIaY0RNBQsNs6.C6uX69XdJsaceW9AmvPZcY49F0vjMTrMPTMNCpTg3OG1a4K";
let SF_CONSUMER_SECRET =
  "E1714891D69E26C5F7BD8FB0A696DB3A9CAB1104FBE366201F0A8A2900EF3F1C";
const token =
  "eyJ0bmsiOiJjb3JlL3Byb2QvMDBEYWswMDAwMUhnUFBZRUEzIiwidmVyIjoiMS4wIiwia2lkIjoiQ09SRV9BVEpXVC4wMERhazAwMDAxSGdQUFkuMTc4OTkwNDAwMDkzNCIsInR0eSI6InNmZGMtY29yZS10b2tlbiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzY3AiOiJzZmFwX2FwaSBjaGF0Ym90X2FwaSBhcGkiLCJzdWIiOiJ1aWQ6MDA1YWswMDAwMGxSUXhwQUFHIiwicm9sZXMiOltdLCJpc3MiOiJodHRwczovL29yZ2Zhcm0tMTc5MzhhMjg5YS1kZXYtZWQuZGV2ZWxvcC5teS5zYWxlc2ZvcmNlLmNvbSIsImNsaWVudF9pZCI6IjNNVkc5Skp3QkJiY040N0lyUE5rZ0ZzWGRJYVkwUk5CUXNOczYuQzZ1WDY5WGRKc2FjZVc5QW12UFpjWTQ5RjB2ak1Uck1QVE1OQ3BUZzNPRzFhNEsiLCJhdWQiOlsiaHR0cHM6Ly9vcmdmYXJtLTE3OTM4YTI4OWEtZGV2LWVkLmRldmVsb3AubXkuc2FsZXNmb3JjZS5jb20iLCJodHRwczovL2FwaS5zYWxlc2ZvcmNlLmNvbSJdLCJuYmYiOjE3OTI1NjU4NjksIm10eSI6Im9hdXRoIiwic2ZhcF9yaCI6ImJvdC1zdmMtYXBpOmF3cy1wcm9kMS11c2Vhc3QxL3VlbmdhZ2UxIiwic2ZpIjoiYTkxOTQxNDI4MmYwY2E4MGYzNDY4OWMwOTdhZTM3YjZlNzZjMTdmMzEyZjRmOGFhYWMwN2ZiN2JlOTYyYzVjZCIsInNmYXBfb3AiOiJFaW5zdGVpbkhhd2tpbmdDMkNFbmFibGVkLEVHcHRGb3JEZXZzQXZhaWxhYmxlLEVpbnN0ZWluR2VuZXJhdGl2ZVNlcnZpY2UsVGFibGVhdU1ldHJpY0Jhc2ljcyxFaW5zdGVpbkdQVE5DUCxNQ1BTZXJ2aWNlIiwiaHNjIjpmYWxzZSwiZXhwIjoxNzkyNTczMDg0LCJpYXQiOjE3OTI1NjU4ODR9.qWY10FcbBj3Zbo75IdQnLlXEPd11ldYeXLs0rwiz1r9WbFcVGCajDuHKdRtHtxVYOSJcHD-QaCRHTuVfOx-yULk4IjFbpas0jpyGakCLmd6rsIiCtpxnqGoERDX_xHxZHvyRQHERrWTtYk8jovrDvkk3x2KQcG_CNBwd-Hh04xfiL7OuexI8YdziDBjLie4O-XyRCXsdm0MEqLLd9s0VAO-r7EOxQOIxttiHTP3EMI-CgDBJri3v4eZCxIBZhJiQ_D_1UhyhBsraWqHgxdlnBOpvYWLA9__iSnoVzCioZ0g2rOPwDWCRrX8E-MMpBLaB59jQff0LemSczFDGo1lSdQ";

const instanceUrl =
  "https://orgfarm-17938a289a-dev-ed.develop.my.salesforce.com";

const query = "SELECT Id, Name FROM SLA__c LIMIT 10";

async function getSLAs() {
  const url = new URL("/services/data/v65.0/query", instanceUrl);

  url.searchParams.set("q", query);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const body = await response.text();

  console.log("HTTP status:", response.status);
  console.log("Response body:", body);

  if (!response.ok) {
    throw new Error(
      `Salesforce request failed: HTTP ${response.status} - ${body}`,
    );
  }

  const data = JSON.parse(body);
  console.log("SLA records:", data.records);
  return data;
}

getSLAs()
  .then((data) => console.log("SLA records:", data.records))
  .catch(console.error);
