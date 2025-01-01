import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <div>Shipment Details: {id}</div>;
};

export default page;
