import React from 'react';
import { Filter } from 'lucide-react';

interface Province {
  provinsi: string;
}

interface ProvinceFilterProps {
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
  provinces: Province[];
}

const ProvinceFilter: React.FC<ProvinceFilterProps> = ({
  selectedProvince,
  onProvinceChange,
  provinces
}) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <label htmlFor="province-select" className="text-sm font-medium text-gray-700">
            Filter Provinsi:
          </label>
        </div>
        <select
          id="province-select"
          value={selectedProvince}
          onChange={(e) => onProvinceChange(e.target.value)}
          className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
        >
          <option value="all">Semua Provinsi (Nasional)</option>
          {provinces
            .sort((a, b) => a.provinsi.localeCompare(b.provinsi))
            .map((province) => (
              <option key={province.provinsi} value={province.provinsi}>
                {province.provinsi}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ProvinceFilter;