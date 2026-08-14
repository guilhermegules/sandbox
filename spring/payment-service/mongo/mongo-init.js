db.createUser({
  user: "root",
  pwd: "root",
  roles: [
    {
      role: "readWrite",
      db: "payment_service_mongo",
    },
  ],
});
