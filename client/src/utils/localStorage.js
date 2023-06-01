export const getSavedEntryIds = () => {
  const savedEntryIds = localStorage.getItem('saved_entries')
    ? JSON.parse(localStorage.getItem('saved_entries'))
    : [];

  return savedEntryIds;
};

export const saveEntryIds = (entryIdArr) => {
  if (entryIdArr.length) {
    localStorage.setItem('saved_entries', JSON.stringify(entryIdArr));
  } else {
    localStorage.removeItem('saved_entries');
  }
};

export const removeEntryId = (entryId) => {
  const savedEntryIds = localStorage.getItem('saved_entries')
    ? JSON.parse(localStorage.getItem('saved_entries'))
    : null;

  if (!savedEntryIds) {
    return false;
  }

  const updatedSavedEntryIds = savedEntryIds?.filter((savedEntryId) => savedEntryId !== entryId);
  localStorage.setItem('saved_entries', JSON.stringify(updatedSavedEntryIds));

  return true;
};
