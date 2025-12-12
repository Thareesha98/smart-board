// src/components/Reports/ReportTable.jsx
import Button from '../UI/Button.jsx';

const ReportTable = ({ reports, onView, onDismiss, onSuspend, currentTab }) => {
  const getPriorityBadge = (priority) => {
    const classes = {
      'High': 'bg-error/20 text-error border-error',
      'Medium': 'bg-accent/20 text-accent border-accent',
      'Low': 'bg-info/20 text-info border-info',
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${classes[priority]}`}>
        {priority}
      </span>
    );
  };
  
  const getActionButtons = (report) => {
      const reportedUser = report.reported;
      
      if (currentTab === 'resolved') {
          return (
              <>
                <Button variant="outline" size="sm" onClick={() => onView(report)}>
                    <i className="fas fa-eye" />
                </Button>
              </>
          );
      }
      
      return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onView(report)}>
                <i className="fas fa-eye" />
            </Button>
            <Button variant="error" size="sm" onClick={() => onDismiss(report)}>
                <i className="fas fa-times" />
            </Button>
            {reportedUser.status === 'active' && (
                <Button variant="suspend" size="sm" onClick={() => onSuspend(reportedUser, report)}>
                    <i className="fas fa-user-slash" />
                </Button>
            )}
          </div>
      );
  }

  return (
    <div className="overflow-x-auto rounded-card border border-background-light shadow-sm">
      <table className="min-w-full divide-y divide-background-light">
        <thead className="bg-background-light/50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Title / Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Reported User</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Priority</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-background-light">
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-background-light/50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-text-muted font-mono">{report.id}</td>
              <td className="px-4 py-3">
                <p className="text-sm font-semibold text-text-dark truncate max-w-xs">{report.title}</p>
                <span className="text-xs text-info capitalize">{report.type}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-text-dark">{report.reported.name}</div>
                <div className="text-xs text-text-muted capitalize">{report.reported.role}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{getPriorityBadge(report.priority)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-text-muted">{report.date}</td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                {getActionButtons(report)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;