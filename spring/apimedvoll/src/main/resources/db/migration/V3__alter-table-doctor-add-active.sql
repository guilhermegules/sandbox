ALTER TABLE doctor add active TINYINT DEFAULT 1;
UPDATE doctor SET active = 1;