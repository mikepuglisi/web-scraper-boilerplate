exports.up = function(knex, Promise) {
  return knex.schema.createTable("properties", table => {
    table.increments("ID").primary();
    table.string("ParcelID").unique().notNullable();
    table.string("LegacyID").notNullable();
    table.jsonb("JSONDoc").notNullable();
    // table.string("owner1");
    // table.string("owner2");
    // table.string("owner3");
    // table.string("mailingAddress1");
    // table.string("mailingAddress2");
    // table.string("city");
    // table.string("state");
    // table.string("zipCode");
    // table.string("country");
    // table.string("landUseCode");
    // table.string("landUseCodeDescription");
    // table.string("totalArea");
    // table.string("totalAreaUOM");
    // table.string("districtGroup");
    // table.string("districtGroupDescription");
    // table.string("lot");
    // table.string("section");
    // table.string("township");
    // table.string("range");
    // table.string("grantor");
    // table.string("grantee");
    // table.string("saleLandUseCode");
    // table.string("saleLandUseCodeDescription");
    // table.float("salePrice");
    // table.date("saleDate");
    // table.string("location");
    // table.string("locationCity");
    // table.string("locationZip");
    // table.string("legalShortDescription");
    // table.text("notes");
    table.timestamp("createdAt", true);
    table.timestamp("updatedAt", true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("properties");
};



