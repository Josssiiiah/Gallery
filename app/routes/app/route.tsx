// File: app/routes/api/beverages.tsx

import { LoaderFunction, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type Beverage = {
  CompanyName: string;
  ContactName: string;
};

export const loader: LoaderFunction = async ({ context }: any) => {
  const db: D1Database = context.DB;

  const { env } = context.cloudflare;
  let { results } = await env.DB.prepare(
    "SELECT CompanyName, ContactName FROM Customers WHERE CompanyName = ?"
  )
    .bind("Bs Beverages")
    .all();

  console.log("results", results);
  return json(results);
};

export default function Route() {
  const beverages = useLoaderData<Beverage[]>();

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
