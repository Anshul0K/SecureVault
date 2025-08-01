const RecentLogin = ({ logs, onViewAll }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Login Activity</h2>
        <button onClick={onViewAll} className="text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {logs.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log, index) => (
            <li
              key={index}
              className="bg-gray-100 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{log.userId?.name || "Unknown User"}</p>
                <p className="text-sm text-gray-600">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {log.ipAddress || "IP Unknown"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentLogin;
