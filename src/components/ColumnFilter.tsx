import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Columns3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnFilterProps {
  visibleColumns: string[];
  onColumnToggle: (columnKey: string) => void;
}

const AVAILABLE_COLUMNS = [
  { key: "checkbox", label: "Select", disabled: true },
  { key: "passkitId", label: "Passkit ID" },
  { key: "externalId", label: "External ID" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "mobile", label: "Mobile" },
  { key: "tier", label: "Tier" },
  { key: "points", label: "Points" },
  { key: "gender", label: "Gender" },
  { key: "dateCreated", label: "Date Created" },
  { key: "actions", label: "Actions", disabled: true },
];

export const ColumnFilter = ({ visibleColumns, onColumnToggle }: ColumnFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-muted-foreground">
          <Columns3 className="w-4 h-4 mr-2" />
          COLUMNS
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 p-4 bg-background border shadow-lg z-50"
        align="end"
      >
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground mb-3">Show Columns</h4>
          {AVAILABLE_COLUMNS.map((column) => (
            <div key={column.key} className="flex items-center space-x-2">
              <Checkbox
                id={column.key}
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={() => onColumnToggle(column.key)}
                disabled={column.disabled}
              />
              <label
                htmlFor={column.key}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  column.disabled ? 'text-muted-foreground' : 'text-foreground cursor-pointer'
                }`}
              >
                {column.label}
              </label>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};