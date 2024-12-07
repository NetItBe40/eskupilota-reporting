import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PeriodSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function PeriodSelect({ value, onValueChange }: PeriodSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sélectionner une période" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="3m">3 derniers mois</SelectItem>
        <SelectItem value="12m">12 derniers mois</SelectItem>
        <SelectItem value="ytd">Année en cours</SelectItem>
      </SelectContent>
    </Select>
  );
}