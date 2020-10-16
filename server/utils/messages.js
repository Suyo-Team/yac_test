function formatMessage(id_user, username, text, created_at) {
  return {
    id_user,
    username,
    text,
    created_at
  };
}

module.exports = formatMessage;