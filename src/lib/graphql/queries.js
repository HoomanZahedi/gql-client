import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        description
        title
        date
      }
    }
  `;
  const data = await client.request(query);
  return data.jobs;
}

export async function getJobById(jobId) {
  const query = gql`
    query singleJob($id: ID!) {
      singleJob(id: $id) {
        id
        title
        description
        date
        company {
          id
          name
          description
        }
      }
    }
  `;
  const data = await client.request(query, { id: jobId });
  return data.singleJob;
}

export async function getCompanyById(companyId) {
  const query = gql`
    query singleCompany($id: ID!) {
      singleCompany(id: $id) {
        id
        name
        description
        job {
          id
          title
          description
        }
      }
    }
  `;
  const data = await client.request(query, { id: companyId });
  return data.singleCompany;
}
