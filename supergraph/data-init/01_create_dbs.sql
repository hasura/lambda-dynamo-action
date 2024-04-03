CREATE DATABASE supergraph_metadata;
CREATE DATABASE subgraph1_metadata;
CREATE DATABASE subgraph2_metadata;

ALTER DATABASE supergraph_metadata OWNER TO postgres;
ALTER DATABASE subgraph1_metadata OWNER TO postgres;
ALTER DATABASE subgraph2_metadata OWNER TO postgres;

CREATE USER hasura;

CREATE DATABASE content_db;
ALTER DATABASE content_db OWNER TO postgres;
GRANT ALL PRIVILEGES ON DATABASE content_db TO hasura;