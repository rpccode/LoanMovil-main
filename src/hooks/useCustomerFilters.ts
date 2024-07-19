import { useEffect, useState } from "react";
import { Persona } from "../Configs/interfaces";

export const useCustomerFilters = (customers: Persona[]) => {
    const [filterFirstName, setFilterFirstName] = useState<string>('');
    const [filterLastName, setFilterLastName] = useState<string>('');
    const [filteredCustomers, setFilteredCustomers] = useState<Persona[]>([]);
  
    useEffect(() => {
      const filtered = customers.filter(
        (customer) =>
          customer.primer_nombre.toLowerCase().includes(filterFirstName.toLowerCase()) &&
          customer.apellido_paterno.toLowerCase().includes(filterLastName.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }, [customers, filterFirstName, filterLastName]);
  
    return {
      filteredCustomers,
      filterFirstName,
      setFilterFirstName,
      filterLastName,
      setFilterLastName,
    };
  };
  