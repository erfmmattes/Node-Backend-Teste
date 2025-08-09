--
-- Estrutura da tabela `cargo`
--
CREATE TABLE `cargo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Inserção de dados na tabela `cargo`
--
INSERT INTO `cargo` (`name`) VALUES ('Administrador');

--
-- Estrutura da tabela `usuario`
--
CREATE TABLE `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `cargo_id` INT NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT '1',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cargo_id`) REFERENCES `cargo` (`id`)
);

--
-- Inserção de dados na tabela `usuario`
--
INSERT INTO `usuario` (`name`, `email`, `password`, `cargo_id`, `is_active`) VALUES ('João Silva', 'joao3@example.com', '$2b$10$/0JlABFu9qWwgxWz1AL1DOxdWeBcRa9QAPUJN0ni/3QAEFZrwusHK', 1, 1);