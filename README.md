# Hasura configurator demo

This is a very simple squid that demonstrates the functionality of the [hasura-configuration tool](https://github.com/abernatskiy/hasura-configuration).

* The tool generates a default Hasura configuration based on the database state. The state is accessed exclusively through Hasura, without directly querying the database.
* The only supported way of authentication is via the `HASURA_GRAPHQL_ADMIN_SECRET` variable.
* The default configuration tracks all database tables within the `public` schema except `migrations`, plus all foreign key relationships.
* The generated configuration is saved to `hasura/config` for your editing pleasure. Each file in the folder corresponds to one call to the [Hasura API](https://hasura.io/docs/latest/api-reference/overview/) and is named as follows:
  ```
  <idx>-<endpoint_url_encoded>-<...comments>.json
  ```
  E.g. a file named `00004-v1%2Fmetadata-txn-burn_id-burn-bwd.json` will cause a call to the `/v1/metadata` endpoint of the local Hasura (localhost:8080) that will come after all other calls with `idx < 4` less than 4. The comment is `txn-burn_id-burn-bwd`, marking the config as enabling the relationship of the table `txn` via the FK field `burn_id` to the table `burn`, in reverse (`bwd`) direction.
* Once generated and edited, the configuration can be applied with
  ```
  npx squid-hasura-configuration apply
  ```
  All configuration calls are made as `admin`.

**What is missing:** Cloud support and example configuration.

To run the demo:

```bash
# 0. Clone the repo and install the deps
git clone https://github.com/abernatskiy/hasura-configuration-example
cd hasura-configuration-example
npm ci

# 1. Start the squid database
docker compose up -d

# 2. Apply TypeORM migrations
npx squid-typeorm-migration apply

# 3. (optional) Regenerate the Hasura configuration
npx squid-hasura-configuration regenerate

# 4. Apply the Hasura configuration
npx squid-hasura-configuration apply
```
You can now visit the [Hasura console](http://localhost:8080/console), login with the admin password `testing` and observe the tables and relationships in the GraphiQL playground.
