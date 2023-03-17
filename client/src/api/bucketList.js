import http from "./http";

export const createBucketListItem = (city) =>
  http.post("/api/bucketlist", city);
