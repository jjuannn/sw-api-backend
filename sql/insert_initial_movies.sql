/*
Run to insert initial movies data.
It is not necessary to run it mandatorily.
*/
INSERT INTO movie (created_at, title, director, opening_crawl, release_date) VALUES
(now(), 'Star Wars Ep. I: The Phantom Menace', 'George Lucas', 'A long time ago in a galaxy far, far away....', '1999-05-19'),
(now(), 'Star Wars Ep II: Attack of the Clones', 'George Lucas', 'A long time ago in a galaxy far, far away....', '2002-05-16'),
(now(), 'Star Wars Ep III: Revenge of the Sith', 'George Lucas', 'A long time ago in a galaxy far, far away....', '2005-05-19'),
(now(), 'Star Wars Ep IV: A New Hope', 'George Lucas', 'A long time ago in a galaxy far, far away....', '1977-05-25'),
(now(), 'Star Wars Ep V: The Empire Strikes Back', 'Irvin Kershner', 'A long time ago in a galaxy far, far away....', '1980-05-21');