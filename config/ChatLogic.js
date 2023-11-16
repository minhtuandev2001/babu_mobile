export const getSender = (loggerUser, users) => {
  return users[0]._id === loggerUser._id ? users[1].name : users[0].name;
}
export const getSenderFull = (loggerUser, users) => {
  return users[0]._id === loggerUser._id ? users[1] : users[0]
}
export const isSameSender = (messages, m, i, userId) => {
  // tin nhắn tiếp theo có người gửi khác với tin nhắn hiện tại và tin nhắn hiện tại không phải client này => không hiện avatar
  return (
    // true  /true /true
    i < messages.length - 1 && (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userId
  )
}
export const isLastMessage = (messages, i, userId) => {
  // kiểm tra đây là tin nhắn cuối cùng và không phải client này
  return (
    i === messages.length - 1 && messages[messages.length - 1].sender._id !== userId && messages[messages.length - 1].sender._id
  )
}

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id && messages[i].sender._id && messages[i].sender._id !== userId
  ) {
    return 43;
  } else if (
    (i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== userId) || (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 10;
  }
  else return "auto";
}

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id
}