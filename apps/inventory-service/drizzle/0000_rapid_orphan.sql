CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`inventory_count` integer DEFAULT 0 NOT NULL
);
