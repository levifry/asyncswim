const messages = ['left','left','left','right','left','up']; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  console.log("here are our messages",messages)
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  return messages.shift();
};

