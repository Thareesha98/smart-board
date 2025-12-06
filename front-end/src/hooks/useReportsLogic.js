import { useState, useMemo } from 'react';
import { sampleReportsData } from '../data/reportsData';

const useReportsLogic = () => {
  const [userReports, setUserReports] = useState(sampleReportsData);
  const [filter, setFilter] = useState('all');

  const filteredReports = useMemo(() => {
    if (filter === 'all') return userReports;
    return userReports.filter(report => report.status === filter);
  }, [userReports, filter]);

  const submitReport = (reportData) => {
    const newReport = {
      id: Date.now(),
      type: reportData.type,
      title: reportData.reportTitle,
      description: reportData.reportDescription,
      severity: reportData.severity,
      incidentDate: reportData.incidentDate,
      boarding: reportData.boarding,
      reportedPerson: reportData.reportedPerson,
      allowContact: reportData.allowContact,
      evidence: reportData.evidence || [],
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      adminResponse: null,
    };

    setUserReports(prev => [newReport, ...prev]);
  };

  return {
    userReports,
    filteredReports,
    submitReport,
    setFilter,
  };
};

export default useReportsLogic;