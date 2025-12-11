const SearchFilterBar = ({ 
  search, 
  onSearchChange, 
  status, 
  onStatusChange,
  priority,
  onPriorityChange 
}) => {
  return (
    <div className="search-filter-bar">
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
