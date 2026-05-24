const STATUS_PRIORITY = {
  progress: 1,
  pending: 2,
  completed: 3,
};

const applyDefaultNotesOrdering = notes => {
  notes.sort((a, b) => {
    // Starred List
    if (a.is_starred && !b.is_starred) return -1;
    if (!a.is_starred && b.is_starred) return 1;

    // Status Priority
    if (STATUS_PRIORITY[a.status] !== STATUS_PRIORITY[b.status]) {
      return STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    }

    // Latest first
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return notes;
};

export default applyDefaultNotesOrdering;
