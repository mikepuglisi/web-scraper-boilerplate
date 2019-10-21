exports.up = function(knex, Promise) {
  return knex.schema.createTable("properties", table => {
    table.increments("id").primary();
    table.string("parcelId").notNullable();
    table.string("streetAddress").notNullable();
    table.string("owner");
    table.integer("finishedArea");
    table.float("acres");
    table.text("landUse");
    table.text("mailingAddress");
    table.text("mailingCityStateZip");
    table.date("lastSaleDate");
    table.date("lastSalePrice");
    table.timestamp("createdAt", true);
    table.timestamp("updatedAt", true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("properties");
};
