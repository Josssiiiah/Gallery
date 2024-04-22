// File: app/routes/api/beverages.tsx

import { LoaderFunction, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

// Assuming a type for the fetched data, adjust according to your actual data schema
type Beverage = {
  CompanyName: string;
  ContactName: string;
};

// Define the environment interface if it's not globally available
interface Env {
  DB: D1Database;
}

// Loader function to fetch data
export const loader: LoaderFunction = async ({ context }: any) => {
  const db: D1Database = context.DB; // Make sure DB is passed in the context
     const { env } = context.cloudflare;
    let { results } = await env.DB.prepare(
    "SELECT CompanyName, ContactName FROM Customers WHERE CompanyName = ?"
  )
    .bind("Bs Beverages")
    .all();

  return json(results); // Return results as JSON
};

// Component to render the fetched data
const Beverages: React.FC = () => {
  const beverages = useLoaderData<Beverage[]>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.5' }}>
      <h1>Beverages Customers</h1>
      <ul>
        {beverages.map((beverage: any, index: any) => (
          <li key={index}>
            {beverage.CompanyName} - {beverage.ContactName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Beverages;
