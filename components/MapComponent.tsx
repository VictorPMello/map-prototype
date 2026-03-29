import { Property } from "@/lib/types";

export default function MapComponent({
  initialData,
}: {
  initialData: Property[];
}) {
  console.log(initialData);
  return <div>Teste</div>;
}
