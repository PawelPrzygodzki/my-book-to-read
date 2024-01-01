import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1703890744729 implements MigrationInterface {
  name = 'Init1703890744729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "authorName" character varying NOT NULL, "externalKey" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "userId" integer, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "list_books_book" ("listId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_7f314640072e06189e50b40eab1" PRIMARY KEY ("listId", "bookId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a04c61705cb077caa8a4f092b3" ON "list_books_book" ("listId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e95cd0420389355700aced74e" ON "list_books_book" ("bookId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_books_book" ADD CONSTRAINT "FK_a04c61705cb077caa8a4f092b34" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_books_book" ADD CONSTRAINT "FK_2e95cd0420389355700aced74ef" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list_books_book" DROP CONSTRAINT "FK_2e95cd0420389355700aced74ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_books_book" DROP CONSTRAINT "FK_a04c61705cb077caa8a4f092b34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e95cd0420389355700aced74e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a04c61705cb077caa8a4f092b3"`,
    );
    await queryRunner.query(`DROP TABLE "list_books_book"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "list"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
