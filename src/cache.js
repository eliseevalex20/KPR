class Cache {
    constructor() {
      this.cacheData = new Map();
      this.accessCount = new Map();
    }
  
    set(key, value, accessCount = 1) {
      this.cacheData.set(key, value);
      this.accessCount.set(key, accessCount);
    }
  
    
    get(key) {
        if (!this.cacheData.has(key) || this.accessCount.get(key) === 0) {
        this.cacheData.delete(key);
        this.accessCount.delete(key);
        return null;
        }
    
        const remainingAccessCount = this.accessCount.get(key);
        this.accessCount.set(key, remainingAccessCount - 1);
        return this.cacheData.get(key);
    }
  
    getStatistics() {
      const statistics = [];
  
      for (const [key, value] of this.cacheData.entries()) {
        const remainingAccessCount = this.accessCount.get(key);
        statistics.push({ key, value, remainingAccessCount });
      }
  
      return statistics;
    }
  }
  
export {Cache}
