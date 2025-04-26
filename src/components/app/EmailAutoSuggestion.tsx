import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

type Student = {
  email: string;
  rollNo: string;
  name: string;
};

type EmailAutoSuggestProps = {
  value: string;
  onChange: (value: string, student?: Student) => void;
};

export function EmailAutoSuggest({ value, onChange }: EmailAutoSuggestProps) {
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length > 1 && isDropdownOpen) {
        try {
          const res = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/email-suggestion/${value}`, {
            method: "GET",
            credentials: "include",
          });

          if (res.ok) {
            const data: Student[] = await res.json(); // explicitly type the data here
            setSuggestions(data);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Failed to fetch suggestions", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [value, isDropdownOpen]);

  const handleSelect = (student: Student) => {
    onChange(student.email, student);
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative">
      <Input
        id="email"
        name="email-autofill"
        autoComplete="off"
        placeholder="Enter your email"
        className="w-full p-2 border rounded-md"
        value={value}
        onChange={handleChange}
      />

      {suggestions.length > 0 && isDropdownOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((student, index) => (
            <li
              key={index}
              onClick={() => handleSelect(student)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {student.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
