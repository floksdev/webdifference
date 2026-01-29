"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type AddressAutocompleteProps = {
  value: string;
  onChange: (address: string) => void;
  onSelect: (address: {
    address: string;
    postalCode: string;
    city: string;
    country: string;
  }) => void;
  placeholder?: string;
  className?: string;
};

type AddressSuggestion = {
  label: string;
  value: {
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
};

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Adresse",
  className = "",
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fermer les suggestions quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchAddress = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      // Utiliser notre route API Next.js pour éviter les problèmes CORS
      const url = `/api/address/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // Ne pas afficher d'erreur si c'est juste un problème de serveur
        // L'autocomplétion peut fonctionner sans suggestions
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const newSuggestions: AddressSuggestion[] = data.features.map((feature: any) => {
          const props = feature.properties;

          // Extraire les composants de l'adresse
          let address = "";
          if (props.housenumber) {
            address = props.housenumber + " ";
          }
          if (props.street) {
            address += props.street;
          } else if (props.name) {
            address += props.name;
          }

          return {
            label: props.label,
            value: {
              address: address.trim() || props.label.split(",")[0],
              postalCode: props.postcode || "",
              city: props.city || props.name || "",
              country: "France",
            },
          };
        });

        setSuggestions(newSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche d'adresse:", error);
      // Ne pas afficher d'erreur à l'utilisateur, juste ne pas afficher de suggestions
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Debounce : attendre 300ms après la dernière frappe
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      searchAddress(newValue);
    }, 300);
  };

  // Nettoyer le timer au démontage
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.value.address);
    onSelect(suggestion.value);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        className={className}
        autoComplete="off"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">Recherche en cours...</div>
          )}
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              <div className="font-medium">{suggestion.label}</div>
              {suggestion.value.postalCode && suggestion.value.city && (
                <div className="text-xs text-gray-500">
                  {suggestion.value.postalCode} {suggestion.value.city}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
