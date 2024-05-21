import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCompanyById } from "../lib/graphql/queries";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState({});
  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    const response = await getCompanyById(companyId);
    setCompany(response);
  };

  return (
    <div>
      <h1 className="title">{company?.name}</h1>
      <div className="box">{company?.description}</div>
      <h3>Job List</h3>
      <ul>
        {company?.job?.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyPage;
