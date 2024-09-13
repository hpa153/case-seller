import { Check } from "lucide-react";

const StandardItem = ({ standard }: { standard: string }) => {
  return (
    <li className="w-fit">
      <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
      {standard}
    </li>
  );
};

export default StandardItem;
