module.exports = class Data1723492841745 {
    name = 'Data1723492841745'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "txn" ("id" character varying NOT NULL, "burn_id" character varying, CONSTRAINT "REL_15037e783fc073eb5d6c221686" UNIQUE ("burn_id"), CONSTRAINT "PK_a455720c0709c620653ede6fb7a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_15037e783fc073eb5d6c221686" ON "txn" ("burn_id") `)
        await db.query(`CREATE TABLE "burn" ("id" character varying NOT NULL, "block" integer NOT NULL, "address" text NOT NULL, "value" numeric NOT NULL, "tx_hash" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_dcb4f14ee4534154b31116553f0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_fc3726cbc7f5d4edf4340ae298" ON "burn" ("address") `)
        await db.query(`CREATE INDEX "IDX_231e60a890bc1b0a2e9430f8fe" ON "burn" ("account_id") `)
        await db.query(`ALTER TABLE "txn" ADD CONSTRAINT "FK_15037e783fc073eb5d6c221686e" FOREIGN KEY ("burn_id") REFERENCES "burn"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "burn" ADD CONSTRAINT "FK_231e60a890bc1b0a2e9430f8fef" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "txn"`)
        await db.query(`DROP INDEX "public"."IDX_15037e783fc073eb5d6c221686"`)
        await db.query(`DROP TABLE "burn"`)
        await db.query(`DROP INDEX "public"."IDX_fc3726cbc7f5d4edf4340ae298"`)
        await db.query(`DROP INDEX "public"."IDX_231e60a890bc1b0a2e9430f8fe"`)
        await db.query(`ALTER TABLE "txn" DROP CONSTRAINT "FK_15037e783fc073eb5d6c221686e"`)
        await db.query(`ALTER TABLE "burn" DROP CONSTRAINT "FK_231e60a890bc1b0a2e9430f8fef"`)
    }
}
