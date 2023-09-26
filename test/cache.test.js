import { Cache } from "../src/cache";

// test("it fails", () => {
//   expect(false).toBe(true);
// });

test("Cache should store and retrieve a value", () => {
  const cache = new Cache();
  cache.set("key1", "value1");
  expect(cache.get("key1")).toBe("value1");
});

test("Cache should return null for a non-existent key", () => {
  const cache = new Cache();
  expect(cache.get("nonexistent")).toBeNull();
});

test("Cache should return null when accessCount runs out", () => {
  const cache = new Cache();
  cache.set("key2", "value2", 0);
  cache.get("key2"); 
  expect(cache.get("key2")).toBeNull();
});

test("Cache should decrement accessCount after each get", () => {
  const cache = new Cache();
  cache.set("key3", "value3", 2);
  cache.get("key3"); 
  expect(cache.get("key3")).toBe("value3");
  expect(cache.get("key3")).toBeNull(); 
});

test("Cache should return statistics correctly", () => {
  const cache = new Cache();
  cache.set("key4", "value4", 3);
  cache.set("key5", "value5", 2);

  cache.get("key4"); 
  cache.get("key5"); 

  const statistics = cache.getStatistics();

  expect(statistics).toContainEqual({ key: "key4", value: "value4", remainingAccessCount: 2 });
  expect(statistics).toContainEqual({ key: "key5", value: "value5", remainingAccessCount: 1 });
});
