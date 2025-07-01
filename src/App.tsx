import React, { useState, useMemo } from 'react';
import { Users, Briefcase, TrendingUp, MapPin, Filter, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { employmentData } from './data/employmentData';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import ProvinceFilter from './components/ProvinceFilter';
import ChartCard from './components/ChartCard';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

function App() {
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState<'pencari' | 'lowongan' | 'penempatan'>('pencari');

  const filteredData = useMemo(() => {
    if (selectedProvince === 'all') {
      return employmentData.filter(item => item.provinsi !== 'Indonesia');
    }
    return employmentData.filter(item => item.provinsi === selectedProvince);
  }, [selectedProvince]);

  const nationalData = employmentData.find(item => item.provinsi === 'Indonesia');

  const topProvinces = useMemo(() => {
    const data = employmentData
      .filter(item => item.provinsi !== 'Indonesia')
      .sort((a, b) => b.pencari_jumlah - a.pencari_jumlah)
      .slice(0, 10);
    return data;
  }, []);

  const placementRatioData = useMemo(() => {
    return employmentData
      .filter(item => item.provinsi !== 'Indonesia')
      .sort((a, b) => b.rasio_penempatan - a.rasio_penempatan)
      .slice(0, 15)
      .map(item => ({
        provinsi: item.provinsi.length > 15 ? item.provinsi.substring(0, 15) + '...' : item.provinsi,
        rasio: (item.rasio_penempatan * 100).toFixed(1),
        fullName: item.provinsi
      }));
  }, []);

  const genderDistribution = useMemo(() => {
    if (selectedProvince === 'all') {
      return [
        { name: 'Laki-laki', value: nationalData?.pencari_l || 0, color: '#3b82f6' },
        { name: 'Perempuan', value: nationalData?.pencari_p || 0, color: '#10b981' }
      ];
    } else {
      const provinceData = employmentData.find(item => item.provinsi === selectedProvince);
      return [
        { name: 'Laki-laki', value: provinceData?.pencari_l || 0, color: '#3b82f6' },
        { name: 'Perempuan', value: provinceData?.pencari_p || 0, color: '#10b981' }
      ];
    }
  }, [selectedProvince, nationalData]);

  const scatterData = useMemo(() => {
    return employmentData
      .filter(item => item.provinsi !== 'Indonesia')
      .map(item => ({
        x: item.lowongan_jumlah,
        y: item.penempatan_jumlah,
        provinsi: item.provinsi,
        size: item.pencari_jumlah / 1000
      }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <ProvinceFilter 
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            provinces={employmentData.filter(item => item.provinsi !== 'Indonesia')}
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Pencari Kerja"
            value={selectedProvince === 'all' ? nationalData?.pencari_jumlah || 0 : filteredData[0]?.pencari_jumlah || 0}
            icon={Users}
            color="blue"
            subtitle="Terdaftar"
          />
          <MetricCard
            title="Total Lowongan"
            value={selectedProvince === 'all' ? nationalData?.lowongan_jumlah || 0 : filteredData[0]?.lowongan_jumlah || 0}
            icon={Briefcase}
            color="green"
            subtitle="Tersedia"
          />
          <MetricCard
            title="Total Penempatan"
            value={selectedProvince === 'all' ? nationalData?.penempatan_jumlah || 0 : filteredData[0]?.penempatan_jumlah || 0}
            icon={TrendingUp}
            color="purple"
            subtitle="Berhasil"
          />
          <MetricCard
            title="Rasio Penempatan"
            value={`${((selectedProvince === 'all' ? nationalData?.rasio_penempatan || 0 : filteredData[0]?.rasio_penempatan || 0) * 100).toFixed(1)}%`}
            icon={BarChart3}
            color="orange"
            subtitle="Efektivitas"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Provinces by Job Seekers */}
          <ChartCard title="Top 10 Provinsi - Pencari Kerja" subtitle="Berdasarkan jumlah pencari kerja terdaftar">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProvinces} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="provinsi" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis fontSize={12} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString('id-ID'), 'Pencari Kerja']}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="pencari_jumlah" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Gender Distribution */}
          <ChartCard title="Distribusi Gender" subtitle={selectedProvince === 'all' ? 'Nasional' : selectedProvince}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value.toLocaleString('id-ID'), 'Orang']} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Placement Ratio Chart */}
        <div className="mb-8">
          <ChartCard title="Rasio Penempatan Kerja" subtitle="Top 15 provinsi dengan rasio penempatan tertinggi">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={placementRatioData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="provinsi" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis 
                  fontSize={12} 
                  tick={{ fill: '#64748b' }}
                  label={{ value: 'Rasio (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: string) => [`${value}%`, 'Rasio Penempatan']}
                  labelFormatter={(label) => {
                    const item = placementRatioData.find(d => d.provinsi === label);
                    return item?.fullName || label;
                  }}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="rasio" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Scatter Plot */}
        <div className="mb-8">
          <ChartCard title="Korelasi Lowongan vs Penempatan" subtitle="Hubungan antara jumlah lowongan dan penempatan kerja">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Lowongan"
                  fontSize={12}
                  tick={{ fill: '#64748b' }}
                  label={{ value: 'Jumlah Lowongan', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Penempatan"
                  fontSize={12}
                  tick={{ fill: '#64748b' }}
                  label={{ value: 'Jumlah Penempatan', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value: number, name: string) => [
                    value.toLocaleString('id-ID'), 
                    name === 'x' ? 'Lowongan' : 'Penempatan'
                  ]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.provinsi;
                    }
                    return '';
                  }}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Scatter data={scatterData} fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Data Ketenagakerjaan Indonesia 2024 | Sumber: Kementerian Ketenagakerjaan RI
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Dashboard dibuat dengan React & Recharts@abdul ghofur
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;