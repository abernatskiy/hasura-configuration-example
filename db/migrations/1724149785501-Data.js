module.exports = class Data1724149785501 {
    name = 'Data1724149785501'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "txn_with_burn" ("id" character varying NOT NULL, "burn_id" character varying, CONSTRAINT "REL_3471ca6409642dfed1bc269aef" UNIQUE ("burn_id"), CONSTRAINT "PK_9954bea833f8146d16d3a3fd925" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_3471ca6409642dfed1bc269aef" ON "txn_with_burn" ("burn_id") `)
        await db.query(`CREATE TABLE "burn" ("id" character varying NOT NULL, "block" integer NOT NULL, "address" text NOT NULL, "value" numeric NOT NULL, "tx_hash" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_dcb4f14ee4534154b31116553f0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_fc3726cbc7f5d4edf4340ae298" ON "burn" ("address") `)
        await db.query(`CREATE INDEX "IDX_231e60a890bc1b0a2e9430f8fe" ON "burn" ("account_id") `)
        await db.query(`ALTER TABLE "txn_with_burn" ADD CONSTRAINT "FK_3471ca6409642dfed1bc269aef0" FOREIGN KEY ("burn_id") REFERENCES "burn"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "burn" ADD CONSTRAINT "FK_231e60a890bc1b0a2e9430f8fef" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "txn_with_burn"`)
        await db.query(`DROP INDEX "public"."IDX_3471ca6409642dfed1bc269aef"`)
        await db.query(`DROP TABLE "burn"`)
        await db.query(`DROP INDEX "public"."IDX_fc3726cbc7f5d4edf4340ae298"`)
        await db.query(`DROP INDEX "public"."IDX_231e60a890bc1b0a2e9430f8fe"`)
        await db.query(`ALTER TABLE "txn_with_burn" DROP CONSTRAINT "FK_3471ca6409642dfed1bc269aef0"`)
        await db.query(`ALTER TABLE "burn" DROP CONSTRAINT "FK_231e60a890bc1b0a2e9430f8fef"`)
    }
}
