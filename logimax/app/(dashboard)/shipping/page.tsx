import Link from "next/link";

export default function Shipments() {
  return (
    <div>
      <li>
        <Link href="/dashboard/shipments/1">Shipment 1</Link>
      </li>
      <li>
        <Link href="/dashboard/shipments/2">Shipment 2</Link>
      </li>
      <li>
        <Link href="/dashboard/shipments/3">Shipment 3</Link>
      </li>
    </div>
  );
}
