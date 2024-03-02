function executeWithMessage(message, asyncFunc) {
    console.log(message);
    asyncFunc();
  }
  
  // Usage
  executeWithMessage('Starting async operation...', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate an async operation with a 1-second delay
    console.log('Async operation completed!');
  });
  