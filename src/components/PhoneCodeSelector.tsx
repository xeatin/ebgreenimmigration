import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

const phoneCodes = [
  { code: "+93", iso: "AF", name: "Afghanistan" },
  { code: "+358", iso: "AX", name: "Aland Islands" },
  { code: "+355", iso: "AL", name: "Albania" },
  { code: "+213", iso: "DZ", name: "Algeria" },
  { code: "+1", iso: "AS", name: "American Samoa" },
  { code: "+376", iso: "AD", name: "Andorra" },
  { code: "+244", iso: "AO", name: "Angola" },
  { code: "+54", iso: "AR", name: "Argentina" },
  { code: "+61", iso: "AU", name: "Australia" },
  { code: "+43", iso: "AT", name: "Austria" },
  { code: "+55", iso: "BR", name: "Brasil" },
  { code: "+1", iso: "CA", name: "Canada" },
  { code: "+238", iso: "CV", name: "Cabo Verde" },
  { code: "+56", iso: "CL", name: "Chile" },
  { code: "+86", iso: "CN", name: "China" },
  { code: "+57", iso: "CO", name: "Colombia" },
  { code: "+593", iso: "EC", name: "Ecuador" },
  { code: "+20", iso: "EG", name: "Egypt" },
  { code: "+34", iso: "ES", name: "España" },
  { code: "+33", iso: "FR", name: "France" },
  { code: "+49", iso: "DE", name: "Germany" },
  { code: "+91", iso: "IN", name: "India" },
  { code: "+39", iso: "IT", name: "Italy" },
  { code: "+81", iso: "JP", name: "Japan" },
  { code: "+52", iso: "MX", name: "México" },
  { code: "+258", iso: "MZ", name: "Moçambique" },
  { code: "+595", iso: "PY", name: "Paraguay" },
  { code: "+51", iso: "PE", name: "Peru" },
  { code: "+351", iso: "PT", name: "Portugal" },
  { code: "+44", iso: "GB", name: "United Kingdom" },
  { code: "+1", iso: "US", name: "United States" },
  { code: "+598", iso: "UY", name: "Uruguay" },
  { code: "+58", iso: "VE", name: "Venezuela" },
];

// Sort alphabetically by name, but put US and BR first
const sortedCodes = [
  ...phoneCodes.filter((p) => p.iso === "US" || p.iso === "BR"),
  ...phoneCodes
    .filter((p) => p.iso !== "US" && p.iso !== "BR")
    .sort((a, b) => a.name.localeCompare(b.name)),
];

function getFlagUrl(iso: string) {
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}

interface PhoneCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneCodeSelector = ({ value, onChange }: PhoneCodeSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = sortedCodes.find((p) => p.code === value && p.iso === (value === "+1" ? "US" : value === "+55" ? "BR" : p.iso)) 
    || sortedCodes.find((p) => p.code === value) 
    || sortedCodes[0];

  const [selectedIso, setSelectedIso] = useState(selected.iso);

  const currentSelected = sortedCodes.find((p) => p.iso === selectedIso) || sortedCodes[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const filtered = sortedCodes.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.includes(search)
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-3 bg-transparent text-foreground font-body text-sm cursor-pointer hover:bg-accent/50 transition-colors rounded-l-lg"
      >
        <img
          src={getFlagUrl(currentSelected.iso)}
          alt={currentSelected.name}
          className="w-5 h-3.5 object-cover rounded-[2px] shrink-0"
        />
        <ChevronDown size={10} className="text-muted-foreground shrink-0 -ml-1" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-[260px] bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-accent">
              <Search size={14} className="text-muted-foreground shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent text-sm text-foreground outline-none w-full font-body placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.iso}
                type="button"
                onClick={() => {
                  setSelectedIso(p.iso);
                  onChange(p.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-body hover:bg-accent transition-colors text-left ${
                  p.iso === selectedIso ? "bg-accent font-semibold" : ""
                }`}
              >
                <img
                  src={getFlagUrl(p.iso)}
                  alt={p.name}
                  className="w-5 h-3.5 object-cover rounded-[2px] shrink-0"
                />
                <span className="text-foreground truncate">{p.name}</span>
                <span className="text-muted-foreground ml-auto shrink-0">{p.code}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-3 font-body">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneCodeSelector;
