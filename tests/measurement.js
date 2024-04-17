(() => {
  window.performanceResults = [];
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.performanceResults.push({
        testCase: document.title,
        ...entry.toJSON(),
      });
    }
    console.log(window.performanceResults);
  });
  observer.observe({ entryTypes: ['navigation'] });
})();