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

export async function createJob({title,description}){
  const mutation = gql`
    mutation( $createJobInput2: createJobInput!){
      createJob(input: $createJobInput2) {
        id,
        title,
        description
      }
    }
  `;
  const data = await client.request(mutation, {
    createJobInput2: {
    title:title,
    description:description
  }
   });
  return data;
}
export async function updateJob({id,title,description}){
  const mutation = gql`
    mutation( $UpdateJobInput: updateJobInput!){
      updateJob(input: $UpdateJobInput) {
        id,
        title,
        description
      }
    }
  `;
  const data = await client.request(mutation, {
    UpdateJobInput: {
    id:id,
    title:title,
    description:description
  }
   });
  return data;
}

export async function deleteJob(id){
  const mutation = gql`
    mutation($deleteJobId: ID! ){
        deleteJob(id: $deleteJobId) {
          title
          description
          id
        }
      }
  `
  const data = await client.request(mutation, {
    deleteJobId: id
   });
  return data;
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
