/*
Run to insert an ADMIN user with the credentials
 - email 'admin@example.com'
 - password 'password'
Required to perform ADMIN operations
*/
INSERT INTO "user" (email, role, password, created_at) VALUES ('admin@example.com', 'ADMIN', '$2b$10$pDUcAEeRnYsBoLDxeimZhu6dvPVxWd9RLol2wRJI5nDKcmVAyrMkm', now())